import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from './../services/storage.service';
import { Produto } from './../models/Produto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  formProduto: FormGroup;
  produto: Produto = new Produto();

  mensagens = {
    nome: [
      {tipo: 'required', mensagem: 'O campo nome é obrigatório'},
      {tipo: 'minlength', mensagem: 'O campo nome tem que ter pelo menos 3 caracteres'}
    ],

    validade: [
    {tipo: 'required', mensagem: 'O campo validade é obrigatório'},
    {tipo: 'minlength', mensagem: 'A validade tem que ter 10 caracteres com as barras'}
  ],
    preco:[
      {tipo: 'required', mensagem: 'O campo preco é obrigatório'},
    ],
  };



  constructor(private formBuilder: FormBuilder,private storageService: StorageService, private route: Router) {
    this.formProduto = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      validade:['', Validators.compose([Validators.required, Validators.minLength(10)])],
      preco:['', Validators.compose([Validators.required])],
    });
   }

  ngOnInit() {
  }

  async salvarCadastro(){
    if(this.formProduto.valid){
     this.produto.nome = this.formProduto.value.nome;
     this.produto.descricao = this.formProduto.value.sobrenome;
     this.produto.validade = this.formProduto.value.cpf;
     this.produto.preco = this.formProduto.value.senha;
     await this.storageService.set(this.produto.nome, this.produto);
     this.route.navigateByUrl('tabs/tab3');
    }
    else{
     alert('Foemulário inválido');
    }
   }

}
