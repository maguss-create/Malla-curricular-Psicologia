const data = [
  {
    nombre: "1° Semestre",
    ramos: [
      "Historia de la Psicología",
      "Neurobiología de la mente",
      "Fundamentos de la Psicología",
      "Epistemología",
      "Herramientas para el trabajo intelectual",
      "Art. de saberes I",
      "Inicio a la formación en Psicología"
    ]
  },
  {
    nombre: "2° Semestre",
    ramos: [
      "Psicología del desarrollo",
      "Procesos cognitivos",
      "Teorías Psicológicas",
      "Métodos orientados a la extensión",
      "Metodología de la investigación",
      "Entrevista psicológica",
      "Art. de saberes II",
      "Formación integral"
    ]
  },
  {
    nombre: "3° Semestre",
    ramos: [
      "Psicología social",
      "Psicología, sujeto y aprendizaje",
      "Ética y deontología",
      "Métodos cualitativos",
      "Idioma",
      "Art. de saberes III"
    ]
  },
  {
    nombre: "4° Semestre",
    ramos: [
      "Clínica I",
      "Psicología y salud",
      "Herramientas clínicas",
      "Métodos cuantitativos",
      "Herramientas de Psicología Social",
      "Idioma",
      "Diseño de proyectos",
      "Art. de saberes IV"
    ]
  },
  {
    nombre: "5° Semestre",
    ramos: [
      "Psicopatología infanto-juvenil",
      "Psicopatología adultos",
      "Neuropsicología",
      "Clínica II",
      "Idioma",
      "Proyectos",
      "Práctica integral",
      "Art. de saberes V",
      "Construcción de itinerario"
    ]
  },
  {
    nombre: "6° Semestre",
    ramos: [
      "Problemáticas contemporáneas",
      "Psicología social",
      "Dispositivos psicoterapéuticos",
      "Idioma",
      "Proyectos",
      "Práctica integral",
      "Art. de saberes VI",
      "Construcción de itinerario"
    ]
  },
  {
    nombre: "7° Semestre",
    ramos: [
      "Optativa",
      "Optativa",
      "Idioma",
      "Proyectos",
      "Práctica de graduación",
      "Optativa",
      "Referencial de egreso"
    ]
  },
  {
    nombre: "8° Semestre",
    ramos: [
      "Optativa",
      "Trabajo final",
      "Optativa",
      "Idioma",
      "Proyectos",
      "Práctica de graduación",
      "Referencial de egreso"
    ]
  }
];

const malla = document.getElementById("malla");
let totalRamos = data.reduce((acc, s) => acc + s.ramos.length, 0);
let aprobados = 0;

data.forEach((semestre, i) => {
  const cont = document.createElement("div");
  cont.className = "semestre";

  const h2 = document.createElement("h2");
  h2.textContent = semestre.nombre;
  cont.appendChild(h2);

  const grid = document.createElement("div");
  grid.className = "grid";

  semestre.ramos.forEach(() => {
    const ramo = document.createElement("div");
    ramo.className = "ramo" + (i > 0 ? " bloqueado" : "");
    ramo.textContent = arguments[0];

    ramo.onclick = () => {
      if (ramo.classList.contains("bloqueado")) return;
      if (ramo.classList.contains("aprobado")) return;

      ramo.classList.add("aprobado");
      aprobados++;
      actualizarProgreso();
      desbloquear(i);
    };

    grid.appendChild(ramo);
  });

  cont.appendChild(grid);
  malla.appendChild(cont);
});

function desbloquear(index) {
  const semestreActual = document.querySelectorAll(".semestre")[index];
  const ramos = semestreActual.querySelectorAll(".ramo");
  const todosAprobados = [...ramos].every(r => r.classList.contains("aprobado"));

  if (todosAprobados) {
    const siguiente = document.querySelectorAll(".semestre")[index + 1];
    if (!siguiente) return;
    siguiente.querySelectorAll(".ramo").forEach(r => r.classList.remove("bloqueado"));
  }
}

function actualizarProgreso() {
  const porcentaje = Math.round((aprobados / totalRamos) * 100);
  const barra = document.getElementById("progress-bar");
  barra.style.width = porcentaje + "%";
  barra.textContent = porcentaje + "%";
}
