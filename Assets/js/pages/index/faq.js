/*Codigo para permitir que apenas uma resposta seja aberta por vez */

document.addEventListener("DOMContentLoaded", () => { //Aguarda até que o documento esteja totalmente carregado
    const detailsElements = document.querySelectorAll("details"); //Seleciona todos os elementos details na pagina
    
    for (let i = 0; i < detailsElements.length; i++) {  //Usa um loop for para iterar sobre todos os elementos <details>.
        detailsElements[i].addEventListener("toggle", function() { //Adiciona um evento toggle a cada elemento <details>.
            if (this.open) { //Verifica se a pergunta do faq atual esta aberta.
                for (let j = 0; j < detailsElements.length; j++) { //Percorre novamente todos os elementos details
                    if (detailsElements[j] !== this) { //Se o elemento não for o que acabou de ser clicado pelo usuario
                        detailsElements[j].removeAttribute("open"); //remove o atributo open do elemento, fechando-o

                    }
                }
            }
        });
    }
});