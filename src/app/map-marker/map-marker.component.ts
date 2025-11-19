import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Map, latLng, marker, icon } from 'leaflet';
import * as L from 'leaflet';
import { CarService } from './marker.service';

@Component({
  selector: 'app-map-marker',
  standalone: true,
  imports: [CommonModule, LeafletModule],
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.css'],
})
export class MapMarkerComponent {
  map!: Map;
  carMarkers: any = {};
  cars: any[] = [];

  customIcon = icon({
    iconUrl: '../assets/image1.png',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
  });

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.initMap();
    this.loadCars();
    setInterval(() => this.loadCars(), 10000);
    // this.loadCars();
  }

  initMap() {
    this.map = new Map('map').setView([35.7, 51.4], 10);
    this.map.invalidateSize();

    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      maxZoom: 14,
    }).addTo(this.map);
  }
  loadCars() {
    this.carService.getCars().subscribe((list) => {
      console.log(list);
      const carsArray = Array.isArray(list) ? list : [list];
      this.cars = carsArray;
      const currentIds = new Set(carsArray.map((car) => car.id));
      Object.keys(this.carMarkers).forEach((id) => {
        if (!currentIds.has(+id)) {
          this.map.removeLayer(this.carMarkers[id]);
          delete this.carMarkers[id];
        }
      });
      carsArray.forEach((car) => {
        if (!this.carMarkers[car.id]) {
          this.carMarkers[car.id] = marker([car.lat, car.lng], {
            icon: this.customIcon,
          })
            .addTo(this.map)
            .bindPopup(`<b>${car.name}</b><br>${car.plate}`);
        } else {
          this.carMarkers[car.id].setLatLng([car.lat, car.lng]);
        }
      });
    });
  }

  // loadCars() {
  //   this.carService.getCars().subscribe((list) => {

  //     console.log(list);
  //     this.cars = list;

  //     list.forEach((car) => {
  //       if (!this.carMarkers[car.id]) {
  //         this.carMarkers[car.id] = marker([car.lat, car.lng], {
  //           icon: this.customIcon,
  //         })
  //           .addTo(this.map)
  //           .bindPopup(`<b>${car.name}</b><br>${car.plate}`);
  //       } else {
  //         this.carMarkers[car.id].setLatLng([car.lat, car.lng]);
  //       }
  //     });
  //   });
  // }

  // loadCars() {
  //   this.carService.getCars().subscribe((list) => {
  //     console.log(list);

  //     const carsArray = Array.isArray(list) ? list : [list];

  //     const firstCar = carsArray[0];
  //     if (!firstCar) return;

  //     this.cars = [firstCar];

  //     if (!this.carMarkers[firstCar.id]) {
  //       this.carMarkers[firstCar.id] = marker([firstCar.lat, firstCar.lng], {
  //         icon: this.customIcon,
  //       })
  //         .addTo(this.map)
  //         .bindPopup(`<b>${firstCar.name}</b><br>${firstCar.plate}`);
  //     } else {
  //       this.carMarkers[firstCar.id].setLatLng([firstCar.lat, firstCar.lng]);
  //     }
  //   });
  // }

  trackByCarId(index: number, car: any): number {
    return car.id;
  }
}
