import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { MapMarkerComponent } from "./map-marker/map-marker.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, MapMarkerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
