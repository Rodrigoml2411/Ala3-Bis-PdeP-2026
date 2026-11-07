var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function input(question) {
    return new Promise(function (resolve) {
        rl.question(question, function (answer) {
            resolve(answer);
        });
    });
}
var MAX_TAREAS = 10;
var MAX_TITULO = 100;
var MAX_DESC = 500;
var Estado;
(function (Estado) {
    Estado[Estado["PENDIENTE"] = 0] = "PENDIENTE";
    Estado[Estado["EN_CURSO"] = 1] = "EN_CURSO";
    Estado[Estado["TERMINADA"] = 2] = "TERMINADA";
    Estado[Estado["CANCELADA"] = 3] = "CANCELADA";
})(Estado || (Estado = {}));
var Dificultad;
(function (Dificultad) {
    Dificultad[Dificultad["FACIL"] = 0] = "FACIL";
    Dificultad[Dificultad["MEDIO"] = 1] = "MEDIO";
    Dificultad[Dificultad["DIFICIL"] = 2] = "DIFICIL";
})(Dificultad || (Dificultad = {}));
var nombres_estado = ["Pendiente", "En curso", "Terminada", "Cancelada"];
var emojis_dificultad = ["⭐", "⭐⭐", "⭐⭐⭐"];
var cantidadTareas = 0;
var tareas = [];
function agregarTareas() {
    return __awaiter(this, void 0, void 0, function () {
        var nueva, _a, _b, dif, _c, est, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (cantidadTareas >= MAX_TAREAS) {
                        console.log("Límite de tareas alcanzado.\n");
                        return [2 /*return*/];
                    }
                    nueva = {
                        titulo: "",
                        descripcion: "",
                        dificultad: Dificultad.FACIL,
                        estado: Estado.PENDIENTE,
                        fechaCreacion: "",
                    };
                    _a = nueva;
                    return [4 /*yield*/, input("Ingrese el título de la tarea: ")];
                case 1:
                    _a.titulo = (_f.sent()).slice(0, MAX_TITULO);
                    _b = nueva;
                    return [4 /*yield*/, input("Descripción (opcional, ENTER para omitir): ")];
                case 2:
                    _b.descripcion = (_f.sent()).slice(0, MAX_DESC);
                    _c = parseInt;
                    return [4 /*yield*/, input("Dificultad (0: Fácil, 1: Medio, 2: Difícil): ")];
                case 3:
                    dif = _c.apply(void 0, [_f.sent()]);
                    nueva.dificultad = (dif >= 0 && dif <= 2) ? dif : Dificultad.FACIL;
                    _d = parseInt;
                    return [4 /*yield*/, input("Estado (0: Pendiente, 1: En curso, 2: Terminada, 3: Cancelada): ")];
                case 4:
                    est = _d.apply(void 0, [_f.sent()]);
                    nueva.estado = (est >= 0 && est <= 3) ? est : Estado.PENDIENTE;
                    _e = nueva;
                    return [4 /*yield*/, input("Ingrese la fecha de creación (Formato: AAAA-MM-DD): ")];
                case 5:
                    _e.fechaCreacion = _f.sent();
                    tareas.push(nueva);
                    cantidadTareas++;
                    console.log("✅ Tarea agregada con éxito.\n");
                    return [2 /*return*/];
            }
        });
    });
}
function mostrarTareas() {
    if (cantidadTareas === 0) {
        console.log("No hay tareas registradas.\n");
        return;
    }
    for (var i = 0; i < cantidadTareas; i++) {
        var t = tareas[i];
        if (t) {
            console.log("\nTarea #".concat(i + 1));
            console.log("Título:", t.titulo);
            console.log("Descripción:", t.descripcion);
            console.log("Estado:", nombres_estado[t.estado]);
            console.log("Dificultad:", emojis_dificultad[t.dificultad]);
            console.log("Fecha de creación:", t.fechaCreacion);
        }
    }
}
function filtrarPorEstado(estado) {
    var encontradas = [];
    for (var i = 0; i < tareas.length; i++) {
        var tarea = tareas[i];
        if (tarea && tarea.estado === estado) {
            encontradas.push({ tarea: tarea, index: i });
        }
    }
    if (encontradas.length === 0) {
        console.log("No hay tareas en este estado.\n");
    }
    else {
        for (var _i = 0, encontradas_1 = encontradas; _i < encontradas_1.length; _i++) {
            var t = encontradas_1[_i];
            console.log("Tarea #".concat(t.index + 1, ": ").concat(t.tarea.titulo));
            console.log("Descripción:", t.tarea.descripcion, "\n");
        }
    }
}
function verTareas() {
    return __awaiter(this, void 0, void 0, function () {
        var opcion, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("\n¿Qué tareas deseas ver?");
                    console.log("1. Todas las tareas.");
                    console.log("2. Tareas pendientes.");
                    console.log("3. Tareas en curso.");
                    console.log("4. Tareas terminadas.");
                    console.log("5. Tareas canceladas.");
                    console.log("0. Salir.");
                    _a = parseInt;
                    return [4 /*yield*/, input("> ")];
                case 1:
                    opcion = _a.apply(void 0, [_b.sent()]);
                    switch (opcion) {
                        case 1:
                            mostrarTareas();
                            break;
                        case 2:
                            filtrarPorEstado(Estado.PENDIENTE);
                            break;
                        case 3:
                            filtrarPorEstado(Estado.EN_CURSO);
                            break;
                        case 4:
                            filtrarPorEstado(Estado.TERMINADA);
                            break;
                        case 5:
                            filtrarPorEstado(Estado.CANCELADA);
                            break;
                        case 0:
                            console.log("Saliendo de la visualización...");
                            break;
                        default:
                            console.log("Opción no válida.");
                            break;
                    }
                    _b.label = 2;
                case 2:
                    if (opcion !== 0) return [3 /*break*/, 0];
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function buscarTareas() {
    return __awaiter(this, void 0, void 0, function () {
        var tituloBuscado, encontrada;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, input("Pon el nombre de la tarea que deseas buscar: ")];
                case 1:
                    tituloBuscado = _a.sent();
                    encontrada = tareas.find(function (t) { return t.titulo === tituloBuscado; });
                    if (encontrada) {
                        console.log("\n✅ Tarea encontrada:");
                        console.log("Título:", encontrada.titulo);
                        console.log("Descripción:", encontrada.descripcion);
                        console.log("Estado:", nombres_estado[encontrada.estado]);
                        console.log("Dificultad:", emojis_dificultad[encontrada.dificultad]);
                        console.log("Fecha de creación:", encontrada.fechaCreacion);
                    }
                    else {
                        console.log("❌ Tarea no encontrada.");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var respuesta, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("\nHola Olivia!!");
                    console.log("¿Qué deseas hacer?");
                    console.log("1. Ver mis tareas.");
                    console.log("2. Buscar una tarea.");
                    console.log("3. Agregar una tarea.");
                    console.log("0. Salir.");
                    _a = parseInt;
                    return [4 /*yield*/, input("> ")];
                case 1:
                    respuesta = _a.apply(void 0, [_c.sent()]);
                    _b = respuesta;
                    switch (_b) {
                        case 1: return [3 /*break*/, 2];
                        case 2: return [3 /*break*/, 4];
                        case 3: return [3 /*break*/, 6];
                        case 0: return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 9];
                case 2: return [4 /*yield*/, verTareas()];
                case 3:
                    _c.sent();
                    return [3 /*break*/, 10];
                case 4: return [4 /*yield*/, buscarTareas()];
                case 5:
                    _c.sent();
                    return [3 /*break*/, 10];
                case 6: return [4 /*yield*/, agregarTareas()];
                case 7:
                    _c.sent();
                    return [3 /*break*/, 10];
                case 8:
                    console.log("Saliendo del programa...");
                    return [3 /*break*/, 10];
                case 9:
                    console.log("Opción no válida.");
                    _c.label = 10;
                case 10:
                    if (respuesta !== 0) return [3 /*break*/, 0];
                    _c.label = 11;
                case 11:
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
main();
