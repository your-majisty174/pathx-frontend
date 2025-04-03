'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Replace with your Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

interface Location {
  name: string
  coordinates: [number, number]
}

interface Route {
  id: number
  name: string
  start: Location
  end: Location
  waypoints?: Location[]
  status: string
}

interface MapProps {
  routes: Route[]
  selectedRoute: number | null
  onRouteSelect: (id: number | null) => void
}

export default function Map({ routes, selectedRoute, onRouteSelect }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const popups = useRef<mapboxgl.Popup[]>([])

  useEffect(() => {
    if (!mapContainer.current) return

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.0060, 40.7128], // Default center (New York)
      zoom: 12,
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Cleanup
    return () => {
      map.current?.remove()
    }
  }, [])

  useEffect(() => {
    if (!map.current) return

    // Clear existing markers and popups
    markers.current.forEach(marker => marker.remove())
    popups.current.forEach(popup => popup.remove())
    markers.current = []
    popups.current = []

    // Add markers and routes for each route
    routes.forEach(route => {
      // Add start marker
      const startMarker = new mapboxgl.Marker({ color: '#10B981' })
        .setLngLat(route.start.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>Start:</strong> ${route.start.name}`))
        .addTo(map.current!)

      // Add end marker
      const endMarker = new mapboxgl.Marker({ color: '#EF4444' })
        .setLngLat(route.end.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>End:</strong> ${route.end.name}`))
        .addTo(map.current!)

      // Add waypoint markers if any
      const waypointMarkers = route.waypoints?.map(waypoint => {
        const marker = new mapboxgl.Marker({ color: '#F59E0B' })
          .setLngLat(waypoint.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(`<strong>Waypoint:</strong> ${waypoint.name}`))
          .addTo(map.current!)
        return marker
      }) || []

      // Draw route line
      const coordinates = [
        route.start.coordinates,
        ...(route.waypoints?.map(wp => wp.coordinates) || []),
        route.end.coordinates,
      ]

      map.current!.addSource(`route-${route.id}`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates,
          },
        },
      })

      map.current!.addLayer({
        id: `route-${route.id}`,
        type: 'line',
        source: `route-${route.id}`,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': selectedRoute === route.id ? '#3B82F6' : '#6B7280',
          'line-width': selectedRoute === route.id ? 4 : 2,
        },
      })

      // Store markers for cleanup
      markers.current.push(startMarker, endMarker, ...waypointMarkers)
    })

    // Fit bounds to show all routes
    if (routes.length > 0) {
      const bounds = new mapboxgl.LngLatBounds()
      routes.forEach(route => {
        bounds.extend(route.start.coordinates)
        bounds.extend(route.end.coordinates)
        route.waypoints?.forEach(waypoint => bounds.extend(waypoint.coordinates))
      })
      map.current.fitBounds(bounds, { padding: 50 })
    }
  }, [routes, selectedRoute])

  return (
    <div ref={mapContainer} className="w-full h-full" />
  )
} 