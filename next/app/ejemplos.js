var titulo = "";
var EstaVariableExiste = "David";

var nuevoTitulo = titulo=="" ? "Esta vacio" : "Esta lleno"; // ternary operator

var miNombre = EstaVariableExiste ?? "Juan"; // nullish coalescing operator

console.log(miNombre)

var arr = [1,2,3,4,5,6,7,8,9,10];


var nuevoMap = arr.map( (valor) => { // lambdas
    return valor*2;
});

var ultimoElemento = nuevoMap.reduce( (acumulador, valor) => {
    console.log(acumulador, valor)
    return acumulador + valor;
});

console.log(nuevoMap)

nuevoMap = nuevoMap.filter( (valor) => {
    return valor%2!=0 || valor==2;
});

console.log(nuevoMap)


var sdasdas = [];

sdasdas = "asdas";

sdasdas = 1;

console.log(sdasdas);