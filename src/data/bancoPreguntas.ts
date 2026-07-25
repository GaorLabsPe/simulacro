import { Area, Pregunta, Flashcard } from '../types';

export const AREAS_PNP: Area[] = [
  {
    id: "penal",
    nombre: "Derecho Penal & Procesal Penal",
    color: "#8B2C2C",
    icono: "ShieldAlert",
    descripcion: "Código Penal, Tipos Delictivos, Código Procesal Penal, Detención en Flagrancia y Cadena de Custodia."
  },
  {
    id: "reglamento",
    nombre: "Normativa & Régimen PNP",
    color: "#1B4B5A",
    icono: "BookMarked",
    descripcion: "Ley de la PNP (DL 1267), Ley del Régimen Disciplinario (Ley 30714 / DL 1150) y Organización Inst. PNP."
  },
  {
    id: "fuerza",
    nombre: "Uso de la Fuerza & DD.HH.",
    color: "#2E5A1C",
    icono: "Scale",
    descripcion: "Decreto Legislativo N° 1186, Niveles de Fuerza, Principios de Legalidad, Necesidad y Proporcionalidad."
  },
  {
    id: "cultura",
    nombre: "Cultura General & Constitución",
    color: "#5A4A1B",
    icono: "Landmark",
    descripcion: "Constitución Política del Perú 1993, Historia del Perú, Geografía, Geopolítica y Actualidad Nacional."
  }
];

export const BANCO_PREGUNTAS_PNP: Pregunta[] = [
  // ================= DERECHO PENAL & PROCESAL PENAL =================
  {
    id: "pen-01",
    area: "penal",
    tema: "Delitos contra la vida",
    enunciado: "Según el Código Penal peruano, ¿cuál es el rango de la pena privativa de la libertad para el delito de homicidio simple (Art. 106 CP)?",
    alternativas: [
      "A) No menor de 3 ni mayor de 10 años",
      "B) No menor de 6 ni mayor de 20 años",
      "C) No menor de 15 ni mayor de 35 años",
      "D) Cadena perpetua"
    ],
    correcta: 1,
    explicacion: "El Art. 106 del Código Penal sanciona el homicidio simple con pena privativa de la libertad no menor de seis ni mayor de veinte años.",
    articuloLey: "Código Penal - Art. 106",
    dificultad: "intermedio"
  },
  {
    id: "pen-02",
    area: "penal",
    tema: "Delitos contra la vida",
    enunciado: "El tipo penal de Parricidio (Art. 107 CP) exige necesariamente que el sujeto activo actúe:",
    alternativas: [
      "A) Con ferocidad o codicia",
      "B) Conociendo el vínculo de parentesco o relación con la víctima",
      "C) Utilizando veneno o fuego únicamente",
      "D) En estado de ebriedad absoluta"
    ],
    correcta: 1,
    explicacion: "El parricidio requiere la presencia del elemento subjetivo del tipo: el conocimiento efectivo del vínculo de parentesco (ascendiente, descendiente, cónyuge o concubino) con la víctima.",
    articuloLey: "Código Penal - Art. 107",
    dificultad: "intermedio"
  },
  {
    id: "pen-03",
    area: "penal",
    tema: "Delitos contra la vida",
    enunciado: "El delito de Feminicidio (Art. 108-B CP) sanciona a quien mata a una mujer por su condición de tal. ¿Cuál es la pena mínima en su figura básica?",
    alternativas: [
      "A) 10 años",
      "B) 15 años",
      "C) 20 años",
      "D) 30 años"
    ],
    correcta: 2,
    explicacion: "Conforme al Art. 108-B del CP, la pena básica para el delito de feminicidio es no menor de veinte años de pena privativa de la libertad.",
    articuloLey: "Código Penal - Art. 108-B",
    dificultad: "avanzado"
  },
  {
    id: "pen-04",
    area: "penal",
    tema: "Delitos contra el patrimonio",
    enunciado: "¿Cuál es la diferencia sustancial entre los delitos de Hurto (Art. 185 CP) y Robo (Art. 188 CP)?",
    alternativas: [
      "A) El valor económico del bien sustraído",
      "B) El empleo de violencia o amenaza inminente contra las personas",
      "C) Que el hurto se cometa de noche y el robo de día",
      "D) El grado de instrucción del delincuente"
    ],
    correcta: 1,
    explicacion: "El robo exige como elemento constitutivo el empleo de violencia o amenaza de un peligro inminente para la vida o integridad física de la víctima. El hurto carece de violencia contra personas.",
    articuloLey: "Código Penal - Arts. 185 y 188",
    dificultad: "fácil"
  },
  {
    id: "pen-05",
    area: "penal",
    tema: "Delitos contra el patrimonio",
    enunciado: "Si dos o más personas ingresan con pasamontañas y armas de fuego a un establecimiento comercial para llevarse el dinero de la caja, se configura:",
    alternativas: ["A) Hurto simple", "B) Robo agravado", "C) Estafa agravada", "D) Extorsión simple"],
    correcta: 1,
    explicacion: "Configura Robo Agravado (Art. 189 CP) por las agravantes de cometerse a mano armada, a mano de dos o más personas y con el rostro cubierto.",
    articuloLey: "Código Penal - Art. 189",
    dificultad: "fácil"
  },
  {
    id: "pen-06",
    area: "penal",
    tema: "Delitos contra la administración pública",
    enunciado: "El delito de Peculado por apropiación (Art. 387 CP) exige que el funcionario o servidor público:",
    alternativas: [
      "A) Solicite una comisión ilegal para otorgar una licitación",
      "B) Se apropie o utilice caudales o efectos cuya percepción, custodia o administración le estén confiados por razón de su cargo",
      "C) Omita denunciar un acto de corrupción detectado en su oficina",
      "D) Abandone intempestivamente sus funciones policiales"
    ],
    correcta: 1,
    explicacion: "El peculado se fundamenta en la violación del deber de fidelidad y custodia de los caudales públicos encomendados en razón del cargo administrativo o funcional del efectivo.",
    articuloLey: "Código Penal - Art. 387",
    dificultad: "intermedio"
  },
  {
    id: "pen-07",
    area: "penal",
    tema: "Delitos contra la administración pública",
    enunciado: "Un efectivo PNP que solicita dinero a un conductor para no imponerle una papeleta de infracción de tránsito comete el delito de:",
    alternativas: [
      "A) Concusión",
      "B) Cohecho pasivo propio en el ejercicio de la función policial",
      "C) Patrocinio ilegal",
      "D) Abuso de autoridad"
    ],
    correcta: 1,
    explicacion: "El Art. 395-A del Código Penal sanciona expresamente el Cohecho Pasivo Propio en el ejercicio de la función policial cuando el efectivo solicita o acepta donativo para omitir un deber del servicio.",
    articuloLey: "Código Penal - Art. 395-A",
    dificultad: "avanzado"
  },
  {
    id: "pen-08",
    area: "penal",
    tema: "Procesal Penal - Flagrancia",
    enunciado: "Según el Art. 259 del Código Procesal Penal (CPP), la detención policial en flagrancia delictiva procede hasta:",
    alternativas: [
      "A) Las 12 horas de ocurrido el hecho",
      "B) Las 24 horas de ocurrido el hecho",
      "C) Las 48 horas de ocurrido el hecho",
      "D) Las 72 horas de ocurrido el hecho"
    ],
    correcta: 2,
    explicacion: "La Ley N° 29574 y el Art. 259 del NCPP ampliaron el plazo del concepto de flagrancia y cuasiflagrancia policial hasta las 48 horas de producido el delito.",
    articuloLey: "Código Procesal Penal - Art. 259",
    dificultad: "intermedio"
  },
  {
    id: "pen-09",
    area: "penal",
    tema: "Procesal Penal - Cadena de Custodia",
    enunciado: "¿Cuál es el objetivo principal de la Cadena de Custodia en el procedimiento de investigación fiscal/policial?",
    alternativas: [
      "A) Garantizar el traslado inmediato del detenido al penal",
      "B) Garantizar la autenticidad e inalterabilidad de los elementos de convicción o evidencias recabadas",
      "C) Evitar que el abogado defensor revise las actas policiales",
      "D) Reducir los plazos procesales de la investigación preparatoria"
    ],
    correcta: 1,
    explicacion: "La Cadena de Custodia asegura que el elemento probatorio hallado en la escena del crimen sea exactamente el mismo que se presenta e inspecciona en el juicio oral.",
    articuloLey: "Reglamento de Cadena de Custodia MP",
    dificultad: "fácil"
  },
  {
    id: "pen-10",
    area: "penal",
    tema: "Teoría del delito",
    enunciado: "La Legítima Defensa (Art. 20.3 CP) constituye una causa de:",
    alternativas: [
      "A) Inimputabilidad personal",
      "B) Justificación que elimina la antijuridicidad de la conducta",
      "C) Exculpación que perdona la culpa",
      "D) Atenuante de la pena"
    ],
    correcta: 1,
    explicacion: "La legítima defensa es una causa de justificación objetiva. Al configurarse con agresión ilegítima, necesidad racional del medio y falta de provocación, el acto es lícito ante el ordenamiento.",
    articuloLey: "Código Penal - Art. 20 Inc. 3",
    dificultad: "intermedio"
  },

  // ================= NORMATIVA & RÉGIMEN PNP =================
  {
    id: "reg-01",
    area: "reglamento",
    tema: "Ley PNP (DL 1267)",
    enunciado: "Según el DL N° 1267 (Ley de la PNP), la Policía Nacional del Perú es una institución del Estado dependiente del:",
    alternativas: [
      "A) Ministerio de Defensa",
      "B) Ministerio del Interior",
      "C) Ministerio de Justicia y Derechos Humanos",
      "D) Poder Judicial"
    ],
    correcta: 1,
    explicacion: "La PNP es una institución profesional, jerarquizada, no deliberante, dependiente del Sector Interior (MININTER).",
    articuloLey: "Decreto Legislativo N° 1267 - Art. 1",
    dificultad: "fácil"
  },
  {
    id: "reg-02",
    area: "reglamento",
    tema: "Ley PNP (DL 1267)",
    enunciado: "¿Cuál es la máxima autoridad técnica-operativa de la Policía Nacional del Perú?",
    alternativas: [
      "A) El Ministro del Interior",
      "B) El Director General de Inteligencia",
      "C) El Comandante General de la PNP",
      "D) El Inspector General de la PNP"
    ],
    correcta: 2,
    explicacion: "El Comandante General es la máxima autoridad policial en el ámbito técnico-operativo e institucional.",
    articuloLey: "Decreto Legislativo N° 1267 - Art. 8",
    dificultad: "fácil"
  },
  {
    id: "reg-03",
    area: "reglamento",
    tema: "Régimen Disciplinario (Ley 30714)",
    enunciado: "De acuerdo con la Ley N° 30714 (Ley de Régimen Disciplinario PNP), las sanciones se clasifican según la gravedad de las infracciones en:",
    alternativas: [
      "A) Leves, Medianas y Extremas",
      "B) Leves, Graves y Muy Graves",
      "C) Administrativas, Operativas y Penales",
      "D) Verbales, Escritas y Judiciales"
    ],
    correcta: 1,
    explicacion: "La Ley 30714 tipifica taxativamente las infracciones disciplinarias en tres escalas: Leves (L), Graves (G) y Muy Graves (MG).",
    articuloLey: "Ley N° 30714 - Art. 26",
    dificultad: "fácil"
  },
  {
    id: "reg-04",
    area: "reglamento",
    tema: "Régimen Disciplinario (Ley 30714)",
    enunciado: "Una infracción sancionada como 'MUY GRAVE' (MG) en el régimen disciplinario policial puede acarrear la medida de:",
    alternativas: [
      "A) Amonestación verbal en el parte diario",
      "B) Sanción simple de 1 a 10 días de arresto",
      "C) Pase a la situación de Disponibilidad o Pase a la situación de Retiro",
      "D) Descuento del 5% de la remuneración por 1 mes"
    ],
    correcta: 2,
    explicacion: "Las infracciones Muy Graves lesionan gravemente el bien jurídico tutelado y conllevan Pase a Disponibilidad (de 6 meses a 2 años) o Pase a Retiro definitivo.",
    articuloLey: "Ley N° 30714 - Art. 34",
    dificultad: "intermedio"
  },
  {
    id: "reg-05",
    area: "reglamento",
    tema: "Jerarquía y Grados",
    enunciado: "¿Cuál es el orden jerárquico ascendente correcto dentro de la escala de Oficiales de Armas de la PNP?",
    alternativas: [
      "A) Teniente -> Alférez -> Mayor -> Capitán -> Comandante",
      "B) Alférez -> Teniente -> Capitán -> Mayor -> Comandante -> Coronel",
      "C) Alférez -> Capitán -> Teniente -> Mayor -> Coronel",
      "D) Suboficial Superior -> Alférez -> Teniente -> Capitán"
    ],
    correcta: 1,
    explicacion: "La escala jerárquica de Oficiales de Armas asciende en el orden: Alférez, Teniente, Capitán, Mayor, Comandante, Coronel, General y Teniente General.",
    articuloLey: "Decreto Legislativo N° 1267 - Estructura Jerárquica",
    dificultad: "fácil"
  },
  {
    id: "reg-06",
    area: "reglamento",
    tema: "Jerarquía y Grados",
    enunciado: "En la jerarquía de Suboficiales de Armas, el grado máximo alcanzable en la categoría de Suboficiales es:",
    alternativas: [
      "A) Suboficial Brigadier",
      "B) Suboficial Técnico de Primera",
      "C) Suboficial Superior",
      "D) Suboficial Maestro"
    ],
    correcta: 2,
    explicacion: "El grado de Suboficial Superior constituye la cúspide de la carrera del personal de Suboficiales de Armas y Servicios.",
    articuloLey: "Decreto Legislativo N° 1267",
    dificultad: "fácil"
  },
  {
    id: "reg-07",
    area: "reglamento",
    tema: "Derechos y Deberes PNP",
    enunciado: "El personal policial en situación de actividad tiene prohibido:",
    alternativas: [
      "A) Estudiar carreras universitarias en horas libres",
      "B) Emitir opiniones sobre asuntos políticos o sindicales y participar en huelgas",
      "C) Practicar deportes de competencia civil",
      "D) Adquirir bienes inmuebles a su nombre"
    ],
    correcta: 1,
    explicacion: "Por mandato constitucional (Art. 34 de la Carta Magna) y legal, las Fuerzas Armadas y la Policía Nacional no son deliberantes y no pueden ejercer el derecho a huelga ni opiniones partidarias en actividad.",
    articuloLey: "Constitución Art. 34 / Ley PNP",
    dificultad: "intermedio"
  },
  {
    id: "reg-08",
    area: "reglamento",
    tema: "Procedimientos Operativos",
    enunciado: "Al realizar un Control de Identidad Policial (Art. 205 CPP), el efectivo policial debe primordialmente:",
    alternativas: [
      "A) Conducir directamente al ciudadano a la comisaría sin darle explicación",
      "B) Identificarse ante el ciudadano indicando su grado, apellidos y la unidad a la que pertenece",
      "C) Incautar de inmediato el teléfono celular del intervenido",
      "D) Exigir el pago de una tasa de verificación biométrica"
    ],
    correcta: 1,
    explicacion: "En todo procedimiento policial es obligatorio guardar el debido respeto e identificarse claramente con nombre, grado y unidad operativa otorgando la justificación de la intervención.",
    articuloLey: "Código Procesal Penal - Art. 205",
    dificultad: "fácil"
  },

  // ================= USO DE LA FUERZA & DD.HH. =================
  {
    id: "fue-01",
    area: "fuerza",
    tema: "DL 1186 - Principios",
    enunciado: "El Decreto Legislativo N° 1186 regula el Uso de la Fuerza por parte de la PNP. Sus principios fundamentales son:",
    alternativas: [
      "A) Celeridad, Oportunidad y Eficiencia",
      "B) Legalidad, Necesidad y Proporcionalidad",
      "C) Disuasión, Coacción y Letalidad",
      "D) Autoridad, Sumisión y Escalamiento"
    ],
    correcta: 1,
    explicacion: "Los principios rectores rectores obligatorios del Decreto Legislativo 1186 son Legalidad, Necesidad y Proporcionalidad.",
    articuloLey: "DL N° 1186 - Art. 4",
    dificultad: "fácil"
  },
  {
    id: "fue-02",
    area: "fuerza",
    tema: "DL 1186 - Niveles de Resistencia",
    enunciado: "Cuando el intervenido no acata las indicaciones de la autoridad policial de forma verbal, sin violencia física activa, se clasifica como resistencia:",
    alternativas: [
      "A) Pasiva - Riesgo latente o Resistencia pasiva",
      "B) Activa - Agresión no letal",
      "C) Activa - Agresión letal",
      "D) Delictiva organizada"
    ],
    correcta: 0,
    explicacion: "La resistencia pasiva incluye la no obediencia verbal o negativa física a desplazarse sin hacer uso de agresiones ni armas.",
    articuloLey: "DL N° 1186 - Art. 6.1",
    dificultad: "intermedio"
  },
  {
    id: "fue-03",
    area: "fuerza",
    tema: "DL 1186 - Niveles de Uso de la Fuerza",
    enunciado: "Dentro de los niveles Preventivos del uso de la fuerza policial, el primer nivel que percibe el intervenido es:",
    alternativas: [
      "A) Control de contacto",
      "B) Presencia Policial",
      "C) Verbalización",
      "D) Control físico"
    ],
    correcta: 1,
    explicacion: "La Presencia Policial es el primer nivel preventivo. La sola presencia del efectivo correctamente uniformado e identificado ejerce un efecto disuasivo.",
    articuloLey: "DL N° 1186 - Art. 7.1.a",
    dificultad: "fácil"
  },
  {
    id: "fue-04",
    area: "fuerza",
    tema: "DL 1186 - Fuerza Letal",
    enunciado: "El uso de la fuerza letal (arma de fuego) por parte de un policía procede de forma excepcional únicamente en situación de:",
    alternativas: [
      "A) Intervención a cualquier sospechoso que intente darse a la fuga por una falta menor",
      "B) Peligro real e inminente de muerte o lesiones graves para el policía o terceras personas",
      "C) Insultos verbales graves recibidos de parte de un ciudadano manifestante",
      "D) Daños materiales leves a la infraestructura policial"
    ],
    correcta: 1,
    explicacion: "El uso del arma de fuego representa el último nivel reactivo y solo procede para neutralizar una amenaza de muerte o lesiones graves inminentes.",
    articuloLey: "DL N° 1186 - Art. 8.2",
    dificultad: "intermedio"
  },
  {
    id: "fue-05",
    area: "fuerza",
    tema: "Derechos Humanos en la función policial",
    enunciado: "Según el Manual de Derechos Humanos aplicados a la Función Policial, la tortura y los tratos crueles, inhumanos o degradantes:",
    alternativas: [
      "A) Están permitidos solo en investigaciones de terrorismo o crimen organizado",
      "B) Están absolutamente prohibidos en toda circunstancia, sin excepción alguna",
      "C) Se justifican en estado de emergencia decretado por el Gobierno",
      "D) Quedan a criterio de la orden del superior jerárquico"
    ],
    correcta: 1,
    explicacion: "La prohibición de la tortura es una norma imperativa de derecho internacional (Jus Cogens) y no admite excepción ni justificación de ningún tipo ni orden superior.",
    articuloLey: "Constitución Art. 2 / Manual DDHH PNP",
    dificultad: "fácil"
  },

  // ================= CULTURA GENERAL & CONSTITUCIÓN =================
  {
    id: "cul-01",
    area: "cultura",
    tema: "Constitución Política",
    enunciado: "El Artículo 1° de la Constitución Política del Perú establece formalmente que:",
    alternativas: [
      "A) El Perú es un país unitario y descentralizado",
      "B) La defensa de la persona humana y el respeto de su dignidad son el fin supremo de la sociedad y del Estado",
      "C) El idioma oficial es únicamente el castellano",
      "D) El voto es universal, secreto y obligatorio"
    ],
    correcta: 1,
    explicacion: "El Art. 1 de la Constitución consagra la supremacía de la dignidad humana como eje central y razón de ser de todo el Estado peruano.",
    articuloLey: "Constitución Política del Perú - Art. 1",
    dificultad: "fácil"
  },
  {
    id: "cul-02",
    area: "cultura",
    tema: "Constitución Política - Orden Interno",
    enunciado: "Según el Artículo 166 de la Constitución, la finalidad fundamental de la Policía Nacional del Perú es:",
    alternativas: [
      "A) Administrar los penales del país",
      "B) Garantizar, mantener y restablecer el orden interno, prestar protección y ayuda a las personas y a la comunidad",
      "C) Dirigir las relaciones exteriores y tratados diplomáticos",
      "D) Recaudar los tributos de la nación"
    ],
    correcta: 1,
    explicacion: "El Art. 166 establece el mandato constitucional histórico de la PNP: velar por el orden interno, seguridad ciudadana, fronteras y cumplimiento de leyes.",
    articuloLey: "Constitución Política - Art. 166",
    dificultad: "fácil"
  },
  {
    id: "cul-03",
    area: "cultura",
    tema: "Historia del Perú",
    enunciado: "¿En qué fecha se libró la Batalla de Ayacucho, la cual consolidó definitivamente la independencia de América del Sur?",
    alternativas: [
      "A) 28 de Julio de 1821",
      "B) 6 de Agosto de 1824",
      "C) 9 de Diciembre de 1824",
      "D) 2 de Mayo de 1866"
    ],
    correcta: 2,
    explicacion: "La gloriosa Batalla de Ayacucho ocurrió el 9 de diciembre de 1824 en la pampa de la Quinua, bajo el mando del Mariscal Antonio José de Sucre.",
    articuloLey: "Historia del Perú",
    dificultad: "fácil"
  },
  {
    id: "cul-04",
    area: "cultura",
    tema: "Geografía y Geopolítica",
    enunciado: "¿Cuál es la región de mayor extensión territorial del Perú?",
    alternativas: [
      "A) Ucayali",
      "B) Cusco",
      "C) Loreto",
      "D) Madre de Dios"
    ],
    correcta: 2,
    explicacion: "Loreto es el departamento más extenso de la República del Perú, abarcando casi el 29% del territorio nacional.",
    articuloLey: "Geografía Nacional",
    dificultad: "fácil"
  },
  {
    id: "cul-05",
    area: "cultura",
    tema: "Organización del Estado",
    enunciado: "El organismo constitucional autónomo encargado de impartir justicia en materia electoral e impositiva de credenciales a autoridades electas es:",
    alternativas: [
      "A) La ONPE",
      "B) El Jurado Nacional de Elecciones (JNE)",
      "C) La RENIEC",
      "D) El Tribunal Constitucional"
    ],
    correcta: 1,
    explicacion: "El JNE fiscaliza la legalidad del sufragio, administra justicia en materia electoral y proclama los candidatos electos.",
    articuloLey: "Constitución Art. 178",
    dificultad: "intermedio"
  },
  {
    id: "cul-06",
    area: "cultura",
    tema: "Constitución Política - Garantías",
    enunciado: "La garantía constitucional que procede ante el hecho u omisión por parte de cualquier autoridad o persona que vulnera o amenaza la libertad individual es:",
    alternativas: [
      "A) Acción de Amparo",
      "B) Hábeas Corpus",
      "C) Hábeas Data",
      "D) Acción Popular"
    ],
    correcta: 1,
    explicacion: "El Hábeas Corpus tutela la libertad personal y los derechos conexos a ella frente a detenciones arbitrarias o indebidas.",
    articuloLey: "Constitución Art. 200 Inc. 1",
    dificultad: "fácil"
  }
];

export const FLASHCARDS_PNP: Flashcard[] = [
  {
    id: "fc-01",
    area: "reglamento",
    titulo: "Bien Jurídico Tutelado PNP",
    pregunta: "¿Cuáles son los bienes jurídicos tutelados por la Ley de Régimen Disciplinario PNP (Ley 30714)?",
    respuesta: "1. La Ética Policial\n2. La Disciplina Policial\n3. El Servicio Policial\n4. La Imagen Institucional",
    leyRelacionada: "Ley N° 30714 - Art. 2"
  },
  {
    id: "fc-02",
    area: "fuerza",
    titulo: "Triángulo del Uso de la Fuerza",
    pregunta: "¿Cuáles son los 3 principios obligatorios del DL 1186?",
    respuesta: "• Legalidad: Conforme a normas nacionales e internacionales.\n• Necesidad: Cuando otros medios resulten ineficaces.\n• Proporcionalidad: Nivel de fuerza acorde a la resistencia o agresión.",
    leyRelacionada: "Decreto Legislativo N° 1186"
  },
  {
    id: "fc-03",
    area: "penal",
    titulo: "Plazo de Flagrancia Policial",
    pregunta: "¿Hasta cuántas horas se extiende el estado de flagrancia delictiva para detención policial?",
    respuesta: "Hasta 48 HORAS después de la comisión del hecho delictivo (Art. 259 NCPP).",
    leyRelacionada: "Código Procesal Penal - Art. 259"
  },
  {
    id: "fc-04",
    area: "cultura",
    titulo: "Finalidad Fundamental PNP",
    pregunta: "¿Qué indica el Art. 166 de la Constitución Política?",
    respuesta: "Garantizar, mantener y restablecer el orden interno; prestar protección a las personas; garantizar el cumplimiento de las leyes.",
    leyRelacionada: "Constitución Política de 1993"
  }
];
