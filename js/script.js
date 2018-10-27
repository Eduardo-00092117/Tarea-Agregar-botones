window.onload = init;

function init() {
    let todoList = {
        listHTML: document.getElementById("todoList"),
        listTask: [],
        add(task, priority = false) {
            let element = document.createElement("li");

            //Se crea etiqueta donde se guardara el texto escrito en el input, se subrayara o eliminara.
            let inputText = document.createElement("p");
            inputText.innerText = task;
            inputText.style.textDecoration = "none";
            element.appendChild(inputText);

            //Se crea el boton para tachar el texto.
            let tachado = document.createElement("input");
            //Le agrego estilo al boton.
            tachado.type = "button";
            tachado.value = "Terminado";
            tachado.style.margin = "0.6em";
            tachado.style.background = "#484E67";
            tachado.style.color = "white";
            tachado.style.padding = "10px";
            tachado.style.border = "0px";
            //El agrego un evento click, para que tache la linea con un estilo css.
            tachado.addEventListener("click", function () {
                let texto = this.parentNode.firstChild;
                texto.style.textDecoration = "line-through";
            });

            //Se crea el boton de eliminar.
            let borrar = document.createElement("input");
            //Le agrego estilo al boton.
            borrar.type = "button";
            borrar.value = "Eliminar";
            borrar.style.margin = "0.6em";
            borrar.style.background = "#BE3E44";
            borrar.style.color = "white";
            borrar.style.padding = "10px";
            borrar.style.border = "0px";
            //El agrego un evento click, para que elimine el texto.
            borrar.addEventListener("click", function () {
                let parent = this.parentNode.parentNode;
                parent.removeChild(this.parentNode);
            });
            //Se agregan los elementos a la etiqueta LI creado anteriormente.
            element.appendChild(tachado);
            element.appendChild(borrar);

            if (priority) {
                this.listTask.unshift({
                    element,
                    task
                });
                this.listHTML.insertBefore(element, this.listHTML.childNodes[0]);
            } else {
                this.listTask.push({
                    element,
                    task
                });
                this.listHTML.appendChild(element);
            }
        }
    }

    let form = document.managerTask;
    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        let task = form.task.value;

        let validTask = /.{2,}/;
        if (!validTask.test(task)) {
            console.log("Ingrese una descripcion clara");
            return false;
        }

        todoList.add(task, form.important.checked);

    });
}