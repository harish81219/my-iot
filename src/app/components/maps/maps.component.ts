import * as L from 'leaflet';
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent {
  map!: L.Map;
  marker!: L.Marker;
  latitude: number = 17.385044;  // Default Hyderabad
  longitude: number = 78.486671;
  searchQuery: string = '';

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([17.3850, 78.4867], 13); // Set to Hyderabad

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Force the map to refresh after 500ms
    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
  }




  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = L.map('map').setView([this.latitude, this.longitude], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Create draggable marker
    this.marker = L.marker([this.latitude, this.longitude], { draggable: true }).addTo(this.map);

    // Update inputs when marker is dragged
    this.marker.on('dragend', (event: any) => {
      const position = this.marker.getLatLng();
      this.latitude = position.lat;
      this.longitude = position.lng;
    });

    // Update marker when user clicks on map
    this.map.on('click', (event: any) => {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;

      this.marker.setLatLng([lat, lng]);
      this.latitude = lat;
      this.longitude = lng;
    });
  }

  // Search location using OpenStreetMap's Nominatim API
  searchLocation() {
    if (!this.searchQuery) return;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${this.searchQuery}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);

          this.map.setView([lat, lng], 15);
          this.marker.setLatLng([lat, lng]);

          this.latitude = lat;
          this.longitude = lng;
        } else {
          alert("Location not found");
        }
      })
      .catch(error => console.error('Error fetching location:', error));
  }
}
