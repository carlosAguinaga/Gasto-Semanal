let btn_calcular = document.getElementById("addButton");
let nombre_gasto = document.getElementById("nombre_gasto");
let cantidad_gasto = document.getElementById("cantidad_gasto");
let lista = document.getElementById("lista");
let presupuesto = document.getElementById("presupuesto__monto");
let restante = document.getElementById("saldo__monto");

btn_calcular.onclick = () => {
  // validar el input monto del producto
  if (fnValidateNumero(cantidad_gasto.value)) {
    // console.log("valido")
  } else {
    // console.log("no valido")
  }

  //validar nobre del producto
  let product_name = /<|>/;
  if (!nombre_gasto.value.match(product_name)) {
    console.log("valido");
  } else {
    console.log("no valido");
  }

  //creacion item lis (li)
  let etiqueta_li = document.createElement("li");
  etiqueta_li.classList.add("list-group-item");
  etiqueta_li.innerHTML = `<div class="div_item_list">
        <span>${nombre_gasto.value}</span>
        <div class="div_icons">
            <span id="lista_monto" class="badge-pill badge-primary">
                S/. <span>${cantidad_gasto.value}</span>
            </span>
            <span class="material-icons icon">
                delete
            </span>
        </div>
    </div>`;

  // setear click y funcion delete
  etiqueta_li
    .getElementsByTagName("div")[0]
    .getElementsByTagName("div")[0]
    .getElementsByTagName("span")[2]
    .addEventListener("click", deleteItem);
  lista.appendChild(etiqueta_li);

  // permite ver el ultimo elemento de la lista
  let items = lista.getElementsByTagName("li");
  let last = items[items.length - 1];
  last.scrollIntoView();

  // raaliza las operaciones numericas
  actualizar_cantidades();
};

function actualizar_cantidades() {
  let arreglo_item_list = lista.getElementsByTagName("li");

  //identifica los precios de los productos y los suma
  let sumado = 0;
  for (const item of arreglo_item_list) {
    let temp_price = item
      .getElementsByTagName("div")[0]
      .getElementsByTagName("span")[1]
      .getElementsByTagName("span")[0].innerHTML;
    sumado += parseFloat(temp_price);
  }

  // actualiza el saldo restante
  restante.innerHTML = parseFloat(presupuesto.innerHTML) - sumado;

  //cabiar colores del div saldo
  let resto = parseFloat(restante.innerHTML);
  let total = parseFloat(presupuesto.innerHTML);
  if (resto <= total * 0.5 && resto > total * 0.25) {
    // console.log('50%')
    document.getElementById("id_saldo").classList.add("amarillo");
  } else if (resto <= total * 0.25) {
    // console.log('rojo')
    document.getElementById("id_saldo").classList.add("rojo");
  }
}

swal("Ingrese su presupuesto:", {
  content: "input",
}).then((value) => {
  if (fnValidateNumero(value)) {
    presupuesto.innerHTML = value;
    restante.innerHTML = value;
  } else {
    console.log("no es un número valido");
  }
});

function fnValidateNumero(numero_comparable) {
  let number = /^[0-9]$|^[0-9]+[.]?[0-9]+$/;
  return numero_comparable.match(number);
}

function deleteItem(event) {
  // event.target.parentNode.removeChild(event.target)
  let liHijo = event.target.parentNode.parentNode.parentNode;
  lista.removeChild(liHijo);
  actualizar_cantidades()
}
