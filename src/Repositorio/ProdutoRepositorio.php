<?php

use Models\Produto;

class ProdutoRepositorio
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function opcoesCafe()
    {
        $sql1 = "SELECT * FROM produtos WHERE tipo = 'Café' ";
        $statement = $this->pdo->query($sql1);
        $produtoCafe = $statement->fetchAll(PDO::FETCH_ASSOC);

        $dadosCafe = array_map(function ($cafe) {
            return new Produto(
                $cafe['id'],
                $cafe['tipo'],
                $cafe['nome'],
                $cafe['descricao'],
                $cafe['imagem'],
                $cafe['preco']
            );
        }, $produtoCafe);

        return $dadosCafe;
    }

    public function opcoesAlmoco()
    {

        $sql2 = "SELECT * FROM produtos WHERE tipo = 'Almoço' ";
        $statement = $this->pdo->query($sql2);
        $produtoAlmoco = $statement->fetchAll(PDO::FETCH_ASSOC);
        $dadosAlmoco = array_map(function ($almoco) {
            return new Produto(
                $almoco['id'],
                $almoco['tipo'],
                $almoco['nome'],
                $almoco['descricao'],
                $almoco['imagem'],
                $almoco['preco']
            );
        }, $produtoAlmoco);

        return $dadosAlmoco;
    }
}
