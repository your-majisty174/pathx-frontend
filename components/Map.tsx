'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Initialize Mapbox
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

interface Location {
  id: string
  name: string
  coordinates: [number, number]
}

interface Route {
  id: string
  name: string
  startLocation: Location
  endLocation: Location
  waypoints?: Location[]
  status: 'active' | 'scheduled' | 'completed' | 'cancelled'
}

interface MapProps {
  routes: Route[]
  selectedRouteId?: string
  onRouteClick?: (routeId: string) => void
}

export default function Map({ routes, selectedRouteId, onRouteClick }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const markers = useRef<mapboxgl.Marker[]>([])
  const popups = useRef<mapboxgl.Popup[]>([])
  const routeLines = useRef<mapboxgl.GeoJSONSource[]>([])

  useEffect(() => {
    if (!mapContainer.current) return

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40], // Default center (New York)
      zoom: 9,
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Set up map load handler
    map.current.on('load', () => {
      setMapLoaded(true)
    })

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!map.current || !mapLoaded) return

    // Clear existing markers and popups
    markers.current.forEach((marker) => marker.remove())
    markers.current = []
    popups.current.forEach((popup) => popup.remove())
    popups.current = []

    // Clear existing route lines
    routeLines.current.forEach((source) => {
      if (map.current?.getSource(source.id)) {
        map.current.removeLayer(source.id + '-line')
        map.current.removeSource(source.id)
      }
    })
    routeLines.current = []

    // Add markers and routes for each route
    routes.forEach((route) => {
      // Add start location marker
      const startMarker = new mapboxgl.Marker({ color: '#4CAF50' })
        .setLngLat(route.startLocation.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<strong>${route.startLocation.name}</strong><br>Start Location`
          )
        )
        .addTo(map.current!)

      // Add end location marker
      const endMarker = new mapboxgl.Marker({ color: '#F44336' })
        .setLngLat(route.endLocation.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<strong>${route.endLocation.name}</strong><br>End Location`
          )
        )
        .addTo(map.current!)

      // Add waypoint markers if any
      route.waypoints?.forEach((waypoint, index) => {
        const waypointMarker = new mapboxgl.Marker({ color: '#FFC107' })
          .setLngLat(waypoint.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<strong>${waypoint.name}</strong><br>Waypoint ${index + 1}`
            )
          )
          .addTo(map.current!)
        markers.current.push(waypointMarker)
      })

      // Add route line
      const coordinates = [
        route.startLocation.coordinates,
        ...(route.waypoints?.map((w) => w.coordinates) || []),
        route.endLocation.coordinates,
      ]

      const routeSource = {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates,
          },
        },
      }

      const sourceId = `route-${route.id}`
      map.current!.addSource(sourceId, routeSource)

      map.current!.addLayer({
        id: sourceId + '-line',
        type: 'line',
        source: sourceId,
        layout: {},
        paint: {
          'line-color': selectedRouteId === route.id ? '#2196F3' : '#757575',
          'line-width': selectedRouteId === route.id ? 4 : 2,
        },
      })

      routeLines.current.push(routeSource as any)

      // Add click handler for the route line
      map.current!.on('click', sourceId + '-line', (e) => {
        if (e.features && e.features[0] && onRouteClick) {
          onRouteClick(route.id)
        }
      })

      // Change cursor on hover
      map.current!.on('mouseenter', sourceId + '-line', () => {
        map.current!.getCanvas().style.cursor = 'pointer'
      })
      map.current!.on('mouseleave', sourceId + '-line', () => {
        map.current!.getCanvas().style.cursor = ''
      })

      markers.current.push(startMarker, endMarker)
    })

    // Fit bounds to show all routes
    if (routes.length > 0) {
      const bounds = new mapboxgl.LngLatBounds()
      routes.forEach((route) => {
        bounds.extend(route.startLocation.coordinates)
        bounds.extend(route.endLocation.coordinates)
        route.waypoints?.forEach((waypoint) => {
          bounds.extend(waypoint.coordinates)
        })
      })
      map.current.fitBounds(bounds, { padding: 50 })
    }
  }, [routes, selectedRouteId, mapLoaded, onRouteClick])

  return (
    <div
      ref={mapContainer}
      className="w-full h-[600px] rounded-lg shadow-lg"
      style={{ cursor: 'default' }}
    />
  )
} 