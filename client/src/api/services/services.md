 # Regras de negócio

 Essa camada é um design pattern que ajuda a abstrair suas regras de negócio, deixando sua controller mais limpa e com a responsabilidade única.

Um outro ponto importante que a medida que cresce sua aplicação você tende a reutilizar os códigos já implementados nesta camada. Imagine que você tem três controllers que faz uso de um service e você precisa alterar alguma parte do código, obviamente você vai utilizar somente a função no service para alterar, entretanto se não tivessemos essa camada? Teriamos sair procurando no nosso projeto todos os lugares que faz o uso daquele trecho de código.

