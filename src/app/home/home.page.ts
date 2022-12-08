import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/Produto';
import { Usuario } from '../models/Usuario';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  listarProdutos: Produto[] =[];
  listaUsuarios: Usuario[] = [];

  constructor(private storageService: StorageService) { }

  async buscarUsuarios(){
    this.listaUsuarios = await this.storageService.getAll();
  }

  ionViewDidEnter(){
    this.buscarUsuarios();
    this.buscarProdutos();
  }

  async excluirRegistro(email: string){
    await this.storageService.remove(email);
    this.buscarUsuarios();
  }

  async buscarProdutos(){
    this.listarProdutos = await this.storageService.getAll();
  }

  async excluirCadastroProduto(nome: string){
    await this.storageService.remove(nome);
    this.buscarProdutos();
  }

}
