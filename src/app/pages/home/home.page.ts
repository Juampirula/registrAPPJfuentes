import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

interface Tarea {
  nombre: string;
  descripcion: string;
  estado: 'inactiva' | 'en progreso' | 'completada';
  editable: boolean;
  enProgreso: boolean;
  tiempo: string;
  segundosTotales: number;
  intervalId?: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  currentUser: string | null = '';
  nuevaTareaNombre: string = '';
  nuevaTareaDescripcion: string = '';
  tareasActivas: Tarea[] = [];
  tareasCompletadas: Tarea[] = [];

  constructor(private navCtrl: NavController, private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }

  agregarTarea() {
    if (this.nuevaTareaNombre.trim() === '' || this.nuevaTareaDescripcion.trim() === '') {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const nueva: Tarea = {
      nombre: this.nuevaTareaNombre,
      descripcion: this.nuevaTareaDescripcion,
      estado: 'inactiva',
      editable: true,
      enProgreso: false,
      tiempo: '00:00:00',
      segundosTotales: 0,
    };

    this.tareasActivas.push(nueva);
    this.nuevaTareaNombre = '';
    this.nuevaTareaDescripcion = ''; // Limpiar campos
  }

  editarTarea(tarea: Tarea) {
    tarea.editable = !tarea.editable;
  }

  comenzarTarea(tarea: Tarea) {
    tarea.enProgreso = true;
    tarea.editable = false;
    tarea.estado = 'en progreso';

    tarea.intervalId = setInterval(() => {
      tarea.segundosTotales++;
      tarea.tiempo = this.formatearTiempo(tarea.segundosTotales);
    }, 1000);
  }

  completarTarea(tarea: Tarea) {
    clearInterval(tarea.intervalId);
    tarea.estado = 'completada';
    tarea.enProgreso = false;
    this.tareasCompletadas.push(tarea);
    this.tareasActivas = this.tareasActivas.filter((t) => t !== tarea);
  }

  devolverTarea(tarea: Tarea) {
    tarea.estado = 'inactiva';
    tarea.enProgreso = false;
    this.tareasActivas.push(tarea);
    this.tareasCompletadas = this.tareasCompletadas.filter((t) => t !== tarea);
  }

  eliminarTarea(tarea: Tarea) {
    this.tareasActivas = this.tareasActivas.filter((t) => t !== tarea);
  }

  eliminarTareaCompletada(tarea: Tarea) {
    this.tareasCompletadas = this.tareasCompletadas.filter((t) => t !== tarea);
  }

  formatearTiempo(segundos: number): string {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const seg = segundos % 60;
    return `${this.agregarCero(horas)}:${this.agregarCero(minutos)}:${this.agregarCero(seg)}`;
  }

  agregarCero(valor: number): string {
    return valor < 10 ? '0' + valor : valor.toString();
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }
}
