/**
 * MATEHUB - CURRICULUM DATABASE
 * Structura oficială conform programei Ministerului Educației (Gimnaziu V-VIII & Liceu IX-XII)
 */

const CURRICULUM = {
      gimnaziu: {
        title: "Gimnaziu",
        classes: [
          {
            id: "v",
            name: "Clasa a V-a",
            numeral: "V",
            desc: "Numere naturale, fracții ordinare și zecimale, unități de măsură și elemente introductive de geometrie.",
            examBadge: false,
            chapters: [
              {
                id: "v-cap1",
                title: "1. Numere naturale și operații",
                desc: "Scrierea și citirea numerelor, adunarea, scăderea, înmulțirea și împărțirea cu rest.",
                lessons: [
                  {
                    id: "v-1-1",
                    title: "Operații cu numere naturale și Teorema Împărțirii cu Rest",
                    duration: "15 min",
                    difficulty: "Ușor",
                    summary: "Formularea teoremei împărțirii cu rest și ordinea efectuării operațiilor în mulțimea numerelor naturale.",
                    intro: "Împărțirea este operația inversă înmulțirii. Atunci când un număr natural nu se împarte exact la altul, obținem un cât și un rest strict mai mic decât împărțitorul.",
                    keyFormulas: [
                      {
                        name: "Teorema Împărțirii cu Rest",
                        latex: "D = I \\cdot C + R, \\quad \\text{unde } 0 \\le R < I",
                        note: "D = deîmpărțitul, I = împărțitorul (I ≠ 0), C = câtul, R = restul."
                      },
                      {
                        name: "Reguli de calcul cu puteri",
                        latex: "a^m \\cdot a^n = a^{m+n}, \\quad a^m : a^n = a^{m-n}, \\quad (a^m)^n = a^{m \\cdot n}",
                        note: "Valabil pentru orice a natural nenul și exponenți compatibili."
                      }
                    ],
                    examples: [
                      {
                        problem: "Aflați numărul natural $x$ care împărțit la $7$ dă câtul $13$ și restul $5$.",
                        steps: [
                          "Identificăm termenii teoremei: $I = 7$, $C = 13$, $R = 5$.",
                          "Verificăm condiția de existență a restului: $0 \\le 5 < 7$ (adevărat).",
                          "Scriem formula: $x = 7 \\cdot 13 + 5$.",
                          "Calculăm: $7 \\cdot 13 = 91$, deci $x = 91 + 5 = 96$."
                        ],
                        answer: "$x = 96$"
                      }
                    ],
                    traps: "Atenție: Restul trebuie să fie STRICT mai mic decât împărțitorul! Dacă obții un rest mai mare sau egal cu împărțitorul, câtul a fost ales greșit.",
                    quiz: {
                      question: "Dacă un număr se împarte la 6, care este valoarea maximă posibilă a restului?",
                      options: ["6", "5", "0", "7"],
                      correctIndex: 1,
                      explanation: "Conform teoremei, $0 \\le R < 6$, deci cel mai mare rest întreg este $5$."
                    }
                  },
                  {
                    id: "v-1-2",
                    title: "Puteri cu exponent natural. Pătrate și cuburi perfecte",
                    duration: "20 min",
                    difficulty: "Mediu",
                    summary: "Calculul puterilor, proprietăți și recunoașterea pătratelor perfecte prin ultima cifră.",
                    intro: "Ridicarea la putere reprezintă o înmulțire repetată a aceluiași număr.",
                    keyFormulas: [
                      {
                        name: "Ultima cifră a unui pătrat perfect",
                        latex: "U(n^2) \\in \\{0, 1, 4, 5, 6, 9\\}",
                        note: "Niciun pătrat perfect nu se poate termina în 2, 3, 7 sau 8!"
                      }
                    ],
                    examples: [
                      {
                        problem: "Poate fi numărul $A = 5^{2024} + 2$ pătrat perfect?",
                        steps: [
                          "Determinăm ultima cifră a lui $5^{2024}$: orice putere a lui 5 se termină în 5, deci $U(5^{2024}) = 5$.",
                          "Calculăm ultima cifră a sumei: $U(A) = U(5 + 2) = 7$.",
                          "Un pătrat perfect nu se poate termina în cifra 7.",
                          "Concluzie: Numărul $A$ nu este pătrat perfect."
                        ],
                        answer: "Nu, deoarece $U(A) = 7$."
                      }
                    ],
                    traps: "Nu confunda $a^2$ (a la pătrat, $a \\cdot a$) cu $2a$ (dublul lui a, $2 \\cdot a$)!",
                    quiz: {
                      question: "Care dintre următoarele numere NU poate fi pătrat perfect?",
                      options: ["144", "225", "1028", "400"],
                      correctIndex: 2,
                      explanation: "1028 se termină în cifra 8, deci este imposibil să fie pătrat perfect."
                    }
                  }
                ]
              },
              {
                id: "v-cap2",
                title: "2. Fracții ordinare și fracții zecimale",
                desc: "Noțiunea de fracție, fracții subunitare, echiunitare, supraunitare și operații de bază.",
                lessons: [
                  {
                    id: "v-2-1",
                    title: "Fracții ordinare. Clasificare și amplificare/simplificare",
                    duration: "15 min",
                    difficulty: "Ușor",
                    summary: "Cum aducem fracțiile la același numitor și cum efectuăm calcule rapide.",
                    intro: "O fracție ordinară $\\frac{a}{b}$ reprezintă $a$ părți dintr-un întreg împărțit în $b$ părți egale ($b \\neq 0$).",
                    keyFormulas: [
                      {
                        name: "Fracții echivalente prin amplificare",
                        latex: "\\frac{a}{b} = \\frac{a \\cdot k}{b \\cdot k}, \\quad k \\neq 0",
                        note: "Amplificarea nu schimbă valoarea numărului rațional."
                      }
                    ],
                    examples: [
                      {
                        problem: "Amplificați fracția $\\frac{3}{5}$ cu 4.",
                        steps: [
                          "Înmulțim atât numărătorul cât și numitorul cu 4:",
                          "$\\frac{3 \\cdot 4}{5 \\cdot 4} = \\frac{12}{20}$."
                        ],
                        answer: "$\\frac{12}{20}$"
                      }
                    ],
                    traps: "La adunarea fracțiilor nu aduna direct numitorii! Adu mai întâi la numitor comun.",
                    quiz: {
                      question: "Ce tip de fracție este $\\frac{7}{4}$?",
                      options: ["Subunitară", "Supraunitară", "Echiunitară", "Nulă"],
                      correctIndex: 1,
                      explanation: "Numărătorul (7) este mai mare decât numitorul (4), deci fracția este supraunitară."
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "vi",
            name: "Clasa a VI-a",
            numeral: "VI",
            desc: "Mulțimi, divizibilitate, rapoarte și proporții, numere întregi și congruența triunghiurilor.",
            examBadge: false,
            chapters: [
              {
                id: "vi-cap1",
                title: "1. Rapoarte, proporții și procente",
                desc: "Proprietatea fundamentală a proporțiilor, mărimi direct/invers proporționale și calcule cu procente.",
                lessons: [
                  {
                    id: "vi-1-1",
                    title: "Proprietatea fundamentală a proporțiilor și Procente",
                    duration: "20 min",
                    difficulty: "Mediu",
                    summary: "Produsul mezilor este egal cu produsul extremilor și calculul a $p\\%$ dintr-un număr.",
                    intro: "O proporție este o egalitate a două rapoarte: $\\frac{a}{b} = \\frac{c}{d}$.",
                    keyFormulas: [
                      {
                        name: "Proprietatea fundamentală a proporției",
                        latex: "\\frac{a}{b} = \\frac{c}{d} \\iff a \\cdot d = b \\cdot c",
                        note: "Produsul extremilor = produsul mezilor ($b, d \\neq 0$)."
                      },
                      {
                        name: "Calculul procentului",
                        latex: "p\\% \\text{ din } X = \\frac{p}{100} \\cdot X",
                        note: "Utilizat frecvent la scumpiri și reduceri de preț."
                      }
                    ],
                    examples: [
                      {
                        problem: "Un obiect costă 250 lei. Prețul se reduce cu 20%. Care este noul preț?",
                        steps: [
                          "Calculăm reducerea: $20\\% \\text{ din } 250 = \\frac{20}{100} \\cdot 250 = \\frac{1}{5} \\cdot 250 = 50 \\text{ lei}$.",
                          "Scădem reducerea din prețul inițial: $250 - 50 = 200 \\text{ lei}$."
                        ],
                        answer: "200 lei"
                      }
                    ],
                    traps: "La o scumpire urmată de o reducere cu același procent, prețul final NU este egal cu cel inițial, ci este mai mic!",
                    quiz: {
                      question: "Aflați $x$ din proporția $\\frac{x}{6} = \\frac{10}{3}$.",
                      options: ["20", "15", "18", "12"],
                      correctIndex: 0,
                      explanation: "Din proprietatea fundamentală: $3x = 6 \\cdot 10 \\implies 3x = 60 \\implies x = 20$."
                    }
                  }
                ]
              },
              {
                id: "vi-cap2",
                title: "2. Geometrie: Triunghiul și congruența",
                desc: "Cazurile de congruență LUL, ULU, LLL și proprietățile triunghiurilor isoscele și echilaterale.",
                lessons: [
                  {
                    id: "vi-2-1",
                    title: "Cazurile de congruență ale triunghiurilor oarecare",
                    duration: "25 min",
                    difficulty: "Mediu",
                    summary: "Cum demonstrăm că două triunghiuri sunt egale pentru a deduce egalități de laturi și unghiuri.",
                    intro: "Două triunghiuri sunt congruente dacă au laturile și unghiurile corespunzătoare respectiv congruente.",
                    keyFormulas: [
                      {
                        name: "Cazurile de congruență",
                        latex: "\\begin{aligned} \\text{L.U.L.:} & \\quad AB = A'B', \\, \\widehat{B} = \\widehat{B}', \\, BC = B'C' \\\\ \\text{U.L.U.:} & \\quad \\widehat{B} = \\widehat{B}', \\, BC = B'C', \\, \\widehat{C} = \\widehat{C}' \\\\ \\text{L.L.L.:} & \\quad AB = A'B', \\, BC = B'C', \\, AC = A'C' \\end{aligned}",
                        note: "Suficiente pentru a deduce congruența completă $\\triangle ABC \\equiv \\triangle A'B'C'$."
                      }
                    ],
                    examples: [
                      {
                        problem: "În $\\triangle ABC$ isoscel cu $AB = AC$, $M$ este mijlocul lui $[BC]$. Demonstrați că $AM \\perp BC$.",
                        steps: [
                          "Comparăm triunghiurile $\\triangle ABM$ și $\\triangle ACM$:",
                          "1) $AB = AC$ (ipoteză, triunghi isoscel)",
                          "2) $BM = MC$ ($M$ mijlocul lui $BC$)",
                          "3) $[AM]$ latură comună",
                          "Conform cazului L.L.L., $\\triangle ABM \\equiv \\triangle ACM$.",
                          "Rezultă că $\\widehat{AMB} \\equiv \\widehat{AMC}$.",
                          "Fiind unghiuri adiacente suplementare, fiecare are măsura de $180^\\circ : 2 = 90^\\circ$, deci $AM \\perp BC$."
                        ],
                        answer: "$AM \\perp BC$ (mediana pe bază este și înălțime)"
                      }
                    ],
                    traps: "La cazul L.U.L., unghiul trebuie să fie neapărat cel format de cele două laturi congruente, NU un unghi oarecare!",
                    quiz: {
                      question: "Suma măsurilor unghiurilor oricărui triunghi în plan este egală cu:",
                      options: ["90°", "180°", "360°", "270°"],
                      correctIndex: 1,
                      explanation: "În orice triunghi euclidian, $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$."
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "vii",
            name: "Clasa a VII-a",
            numeral: "VII",
            desc: "Numere reale, calcul algebric, Teorema lui Pitagora, asemănarea triunghiurilor și patrulatere.",
            examBadge: false,
            chapters: [
              {
                id: "vii-cap1",
                title: "1. Mulțimea numerelor reale și Radicali",
                desc: "Rădăcina pătrată, scoaterea și introducerea factorilor de sub radical, raționalizarea numitorului.",
                lessons: [
                  {
                    id: "vii-1-1",
                    title: "Radicali. Proprietăți și Raționalizarea numitorului",
                    duration: "25 min",
                    difficulty: "Mediu",
                    summary: "Reguli de calcul cu radicali, scoaterea factorilor și eliminarea radicalului de la numitor.",
                    intro: "Pentru orice număr real $a \\ge 0$, $\\sqrt{a}$ reprezintă numărul real nenegativ al cărui pătrat este $a$.",
                    keyFormulas: [
                      {
                        name: "Proprietăți fundamentale ale radicalilor",
                        latex: "\\sqrt{a \\cdot b} = \\sqrt{a} \\cdot \\sqrt{b}, \\quad \\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}, \\quad \\sqrt{a^2} = |a|",
                        note: "Pentru $a, b \\ge 0$ (și $b > 0$ la numitor)."
                      },
                      {
                        name: "Raționalizarea fracțiilor cu radical",
                        latex: "\\frac{k}{\\sqrt{a}} = \\frac{k\\sqrt{a}}{a}, \\quad \\frac{k}{\\sqrt{a} \\pm \\sqrt{b}} = \\frac{k(\\sqrt{a} \\mp \\sqrt{b})}{a - b}",
                        note: "Se amplifică cu conjugata expresiei de la numitor."
                      }
                    ],
                    examples: [
                      {
                        problem: "Calculați valoarea expresiei: $E = \\sqrt{75} - 2\\sqrt{48} + \\frac{6}{\\sqrt{3}}$.",
                        steps: [
                          "Scoatem factorii de sub radical:",
                          "$\\sqrt{75} = \\sqrt{25 \\cdot 3} = 5\\sqrt{3}$",
                          "$\\sqrt{48} = \\sqrt{16 \\cdot 3} = 4\\sqrt{3} \\implies 2\\sqrt{48} = 8\\sqrt{3}$",
                          "Raționalizăm numitorul: $\\frac{6}{\\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}$",
                          "Însumăm termenii: $E = 5\\sqrt{3} - 8\\sqrt{3} + 2\\sqrt{3} = (5 - 8 + 2)\\sqrt{3} = -\\sqrt{3}$."
                        ],
                        answer: "$E = -\\sqrt{3}$"
                      }
                    ],
                    traps: "Eroare gravă: $\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$! De exemplu, $\\sqrt{9 + 16} = \\sqrt{25} = 5$, pe când $\\sqrt{9} + \\sqrt{16} = 3 + 4 = 7$.",
                    quiz: {
                      question: "Cât este $\\sqrt{(-5)^2}$?",
                      options: ["-5", "5", "±5", "25"],
                      correctIndex: 1,
                      explanation: "Formula este $\\sqrt{x^2} = |x|$. Deci $\\sqrt{(-5)^2} = |-5| = 5$."
                    }
                  }
                ]
              },
              {
                id: "vii-cap2",
                title: "2. Relații metrice în triunghiul dreptunghic",
                desc: "Teorema lui Pitagora, Teorema înălțimii, Teorema catetei și funcții trigonometrice de bază.",
                lessons: [
                  {
                    id: "vii-2-1",
                    title: "Teorema lui Pitagora și Teorema Catetei",
                    duration: "30 min",
                    difficulty: "Mediu",
                    summary: "Legătura dintre lungimile catetelor și ipotenuză într-un triunghi dreptunghic.",
                    intro: "În orice triunghi dreptunghic, pătratul lungimii ipotenuzei este egal cu suma pătratelor lungimilor catetelor.",
                    keyFormulas: [
                      {
                        name: "Teorema lui Pitagora",
                        latex: "a^2 = b^2 + c^2 \\quad \\text{sau} \\quad BC^2 = AB^2 + AC^2",
                        note: "Unde $BC$ este ipotenuza, iar $AB, AC$ sunt catetele."
                      },
                      {
                        name: "Teorema Înălțimii și a Catetei",
                        latex: "h_i^2 = pr_1 \\cdot pr_2, \\quad c^2 = pr_c \\cdot i",
                        note: "$h_i = \\frac{c_1 \\cdot c_2}{i}$ este formula directă pentru înălțimea pe ipotenuză."
                      }
                    ],
                    examples: [
                      {
                        problem: "Fie $\\triangle ABC$ dreptunghic în $A$, cu $AB = 6\\text{ cm}$ și $AC = 8\\text{ cm}$. Aflați ipotenuza $BC$ și înălțimea $AD$.",
                        steps: [
                          "Aflăm ipotenuza cu Pitagora: $BC^2 = AB^2 + AC^2 = 6^2 + 8^2 = 36 + 64 = 100$.",
                          "Deci $BC = \\sqrt{100} = 10\\text{ cm}$.",
                          "Calculăm înălțimea cu formula $h = \\frac{c_1 \\cdot c_2}{i}$:",
                          "$AD = \\frac{AB \\cdot AC}{BC} = \\frac{6 \\cdot 8}{10} = \\frac{48}{10} = 4{,}8\\text{ cm}$."
                        ],
                        answer: "$BC = 10\\text{ cm}, \\quad AD = 4{,}8\\text{ cm}$"
                      }
                    ],
                    traps: "Teorema lui Pitagora se aplică EXCLUSIV în triunghiuri dreptunghice! Pentru triunghiuri oarecare se utilizează Teorema Cosinusului (studiată la liceu).",
                    quiz: {
                      question: "Dacă un triunghi are laturile de 5 cm, 12 cm și 13 cm, triunghiul este:",
                      options: ["Dreptunghic", "Ascuțitunghic", "Obtuzunghic", "Echilateral"],
                      correctIndex: 0,
                      explanation: "Deoarece $5^2 + 12^2 = 25 + 144 = 169 = 13^2$, conform reciprocei teoremei lui Pitagora, triunghiul este dreptunghic."
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "viii",
            name: "Clasa a VIII-a",
            numeral: "VIII",
            desc: "Calcul algebric, funcții, ecuații, geometrie în spațiu (poliedre și corpuri rotunde). Pregătire Evaluare Națională.",
            examBadge: true,
            chapters: [
              {
                id: "viii-cap1",
                title: "1. Calcul algebric și Formule de calcul prescurtat",
                desc: "Formule fundamentale, restrângerea pătratelor, descompunerea în factori și fracții algebrice.",
                lessons: [
                  {
                    id: "viii-1-1",
                    title: "Formule de calcul prescurtat și Descompuneri în factori",
                    duration: "30 min",
                    difficulty: "Important EN",
                    summary: "Stăpânirea formulelor $(a+b)^2$, $(a-b)^2$, $a^2-b^2$ și metode de descompunere utilizate la Evaluarea Națională.",
                    intro: "Formulele de calcul prescurtat permit efectuarea rapidă a înmulțirilor de polinoame și simplificarea expresiilor algebrice complexe $E(x)$.",
                    keyFormulas: [
                      {
                        name: "Pătratul unui binom",
                        latex: "(a \\pm b)^2 = a^2 \\pm 2ab + b^2",
                        note: "Atenție la dublul produs 2ab!"
                      },
                      {
                        name: "Diferența de pătrate",
                        latex: "a^2 - b^2 = (a - b)(a + b)",
                        note: "Extrem de utilă pentru descompunerea numitorilor și simplificări."
                      },
                      {
                        name: "Pătratul unui trinom",
                        latex: "(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ac)",
                        note: "Utilizat și la diagonala paralelipipedului dreptunghic."
                      }
                    ],
                    examples: [
                      {
                        problem: "Se consideră expresia $E(x) = (2x - 3)^2 - 2(2x - 3)(x + 1) + (x + 1)^2$. Arătați că $E(x) = (x - 4)^2$.",
                        steps: [
                          "Observăm structura expresiei: este de forma $A^2 - 2AB + B^2$, unde $A = 2x - 3$ și $B = x + 1$.",
                          "Aplicăm formula de restrângere a pătratului binomului: $A^2 - 2AB + B^2 = (A - B)^2$.",
                          "Înlocuim: $E(x) = [(2x - 3) - (x + 1)]^2$.",
                          "Reducem termenii asemenea din paranteză: $2x - 3 - x - 1 = x - 4$.",
                          "Rezultă: $E(x) = (x - 4)^2$."
                        ],
                        answer: "$E(x) = (x - 4)^2$"
                      }
                    ],
                    traps: "Semnul minus în fața unei paranteze schimbă TOATE semnele din interior: $-(x + 1) = -x - 1$, nu $-x + 1$!",
                    quiz: {
                      question: "Descompunerea corectă a expresiei $x^2 - 16$ este:",
                      options: ["(x - 4)^2", "(x - 4)(x + 4)", "(x - 8)(x + 8)", "x(x - 16)"],
                      correctIndex: 1,
                      explanation: "Formula diferenței de pătrate: $a^2 - b^2 = (a-b)(a+b)$. Aici $b^2 = 16 = 4^2$."
                    }
                  }
                ]
              },
              {
                id: "viii-cap2",
                title: "2. Funcții de gradul I: f(x) = ax + b",
                desc: "Noțiunea de funcție, reprezentare grafică, puncte de intersecție cu axele de coordonate și aria triunghiului determinat de grafic.",
                lessons: [
                  {
                    id: "viii-2-1",
                    title: "Funcția liniară f(x) = ax + b: Grafic și Intersecții cu Axele",
                    duration: "35 min",
                    difficulty: "Esențial EN",
                    summary: "Determinarea punctelor de intersecție cu axele Ox și Oy, desenarea graficului și calculul distanțelor.",
                    intro: "O funcție $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = ax + b$ ($a, b \\in \\mathbb{R}$) se numește funcție liniară sau afină. Graficul său este o dreaptă în planul cartezian.",
                    keyFormulas: [
                      {
                        name: "Intersecția cu axele de coordonate",
                        latex: "\\begin{cases} G_f \\cap Ox: & f(x) = 0 \\implies ax + b = 0 \\implies A\\left(-\\frac{b}{a}, 0\\right) \\\\ G_f \\cap Oy: & x = 0 \\implies f(0) = b \\implies B(0, b) \\end{cases}",
                        note: "Pentru $a \\neq 0$. Graficul se trasează prin unirea punctelor A și B."
                      },
                      {
                        name: "Distanța dintre două puncte în plan",
                        latex: "AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}",
                        note: "Folosită pentru aflarea perimetrelor figurilor formate de grafic."
                      }
                    ],
                    examples: [
                      {
                        problem: "Fie funcția $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = 2x - 4$. Determinați punctele de intersecție ale graficului cu axele și aria triunghiului format de grafic cu axele $Ox$ și $Oy$.",
                        steps: [
                          "Intersecția cu axa $Ox$: rezolvăm $f(x) = 0 \\implies 2x - 4 = 0 \\implies 2x = 4 \\implies x = 2$. Deci punctul este $A(2, 0)$, iar $OA = |2| = 2$.",
                          "Intersecția cu axa $Oy$: calculăm $f(0) = 2(0) - 4 = -4$. Deci punctul este $B(0, -4)$, iar $OB = |-4| = 4$.",
                          "Triunghiul format este $\\triangle AOB$ dreptunghic în originea $O(0, 0)$.",
                          "Aria triunghiului este: $\\mathcal{A}_{\\triangle AOB} = \\frac{OA \\cdot OB}{2} = \\frac{2 \\cdot 4}{2} = 4$ unități pătrate."
                        ],
                        answer: "$A(2, 0), B(0, -4), \\quad \\mathcal{A}_{\\triangle AOB} = 4$"
                      }
                    ],
                    traps: "La calculul lungimilor segmentelor pe axe ($OA$ și $OB$), folosește ÎNTOTDEAUNA modulul coordonatei: lungimea nu poate fi negativă!",
                    quiz: {
                      question: "Pentru funcția $f(x) = -3x + 6$, care este punctul de intersecție cu axa Oy?",
                      options: ["(0, 6)", "(2, 0)", "(0, -3)", "(6, 0)"],
                      correctIndex: 0,
                      explanation: "Pentru intersecția cu Oy punem $x = 0$: $f(0) = 6$, deci punctul este $(0, 6)$."
                    }
                  }
                ]
              },
              {
                id: "viii-cap3",
                title: "3. Geometrie în spațiu: Corpuri rotunde",
                desc: "Cilindrul circular drept, conul circular drept, trunchiul de con și sfera: formule de arii și volume.",
                lessons: [
                  {
                    id: "viii-3-1",
                    title: "Cilindrul, Conul circular drept și Sfera",
                    duration: "40 min",
                    difficulty: "Esențial EN",
                    summary: "Formule complete pentru generatoare, arie laterală, arie totală și volum la corpurile de rotație.",
                    intro: "Corpurile rotunde se obțin prin rotirea completă a unei figuri plane în jurul unei axe de rotație (dreptunghi -> cilindru, triunghi dreptunghic -> con).",
                    keyFormulas: [
                      {
                        name: "Cilindrul circular drept",
                        latex: "A_l = 2\\pi R G, \\quad A_t = 2\\pi R(R + G), \\quad V = \\pi R^2 h \\quad (G = h)",
                        note: "$R$ = raza bazei, $h$ = înălțimea, $G$ = generatoarea."
                      },
                      {
                        name: "Conul circular drept",
                        latex: "G^2 = R^2 + h^2, \\quad A_l = \\pi R G, \\quad A_t = \\pi R(R + G), \\quad V = \\frac{1}{3}\\pi R^2 h",
                        note: "Relația dintre generatoare, rază și înălțime este chiar Teorema lui Pitagora în secțiunea axială."
                      },
                      {
                        name: "Sfera",
                        latex: "A = 4\\pi R^2, \\quad V = \\frac{4}{3}\\pi R^3",
                        note: "Sfera nu are generatoare sau muchii, depinde doar de raza R."
                      }
                    ],
                    examples: [
                      {
                        problem: "Un con circular drept are raza bazei $R = 6\\text{ cm}$ și înălțimea $h = 8\\text{ cm}$. Aflați generatoarea, aria totală și volumul conului.",
                        steps: [
                          "Aflăm generatoarea cu relația lui Pitagora: $G = \\sqrt{R^2 + h^2} = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\text{ cm}$.",
                          "Calculăm aria laterală: $A_l = \\pi R G = \\pi \\cdot 6 \\cdot 10 = 60\\pi\\text{ cm}^2$.",
                          "Aria bazei: $A_b = \\pi R^2 = \\pi \\cdot 6^2 = 36\\pi\\text{ cm}^2$.",
                          "Aria totală: $A_t = A_l + A_b = 60\\pi + 36\\pi = 96\\pi\\text{ cm}^2$.",
                          "Volumul: $V = \\frac{1}{3}\\pi R^2 h = \\frac{1}{3}\\pi \\cdot 36 \\cdot 8 = 12 \\cdot 8 \\cdot \\pi = 96\\pi\\text{ cm}^3$."
                        ],
                        answer: "$G = 10\\text{ cm}, \\quad A_t = 96\\pi\\text{ cm}^2, \\quad V = 96\\pi\\text{ cm}^3$"
                      }
                    ],
                    traps: "Nu uita de factorul $\\frac{1}{3}$ din formula volumului conului! De asemenea, lasă răspunsul în funcție de $\\pi$, cu excepția cazului în care problema precizează explicit aproximarea $\\pi \\approx 3{,}14$.",
                    quiz: {
                      question: "Dacă dublăm raza unei sfere, volumul acesteia crește de:",
                      options: ["2 ori", "4 ori", "8 ori", "16 ori"],
                      correctIndex: 2,
                      explanation: "Volumul depinde de $R^3$. Dacă raza devine $2R$, volumul devine $(2R)^3 = 8R^3$, adică se mărește de 8 ori."
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      liceu: {
        title: "Liceu",
        classes: [
          {
            id: "ix",
            name: "Clasa a IX-a",
            numeral: "IX",
            desc: "Mulțimi, logică, inducție, progresii, funcția de gradul I și al II-lea, vectori și trigonometrie.",
            examBadge: false,
            chapters: [
              {
                id: "ix-cap1",
                title: "1. Progresii aritmetice și geometrice",
                desc: "Formula termenului general, rația progresiei și suma primilor n termeni.",
                lessons: [
                  {
                    id: "ix-1-1",
                    title: "Progresii aritmetice: Termen general și Sumă",
                    duration: "25 min",
                    difficulty: "Important BAC",
                    summary: "Relațiile fundamentale într-o progresie aritmetică $(a_n)_{n \\ge 1}$.",
                    intro: "Un șir de numere este progresie aritmetică dacă fiecare termen (începând cu al doilea) se obține din precedentul prin adăugarea aceluiași număr constant $r$ (numit rație).",
                    keyFormulas: [
                      {
                        name: "Termenul general",
                        latex: "a_n = a_1 + (n - 1) \\cdot r, \\quad \\forall n \\ge 1",
                        note: "Permite determinarea oricărui termen cunoscând $a_1$ și rația $r$."
                      },
                      {
                        name: "Condiția ca trei termeni să fie în progresie aritmetică",
                        latex: "a, b, c \\text{ în P.A.} \\iff b = \\frac{a + c}{2}",
                        note: "Fiecare termen este media aritmetică a vecinilor săi."
                      },
                      {
                        name: "Suma primilor n termeni",
                        latex: "S_n = \\frac{(a_1 + a_n) \\cdot n}{2} = \\frac{[2a_1 + (n-1)r] \\cdot n}{2}",
                        note: "Formula descoperită de Carl Friedrich Gauss."
                      }
                    ],
                    examples: [
                      {
                        problem: "Fie progresia aritmetică $(a_n)_{n\\ge 1}$ cu $a_1 = 3$ și $r = 4$. Calculați $a_{10}$ și suma primilor $10$ termeni $S_{10}$.",
                        steps: [
                          "Aflăm $a_{10}$: $a_{10} = a_1 + (10 - 1)r = 3 + 9 \\cdot 4 = 3 + 36 = 39$.",
                          "Calculăm suma cu formula lui Gauss: $S_{10} = \\frac{(a_1 + a_{10}) \\cdot 10}{2} = \\frac{(3 + 39) \\cdot 10}{2}$.",
                          "Simplificăm: $S_{10} = \\frac{42 \\cdot 10}{2} = 21 \\cdot 10 = 210$."
                        ],
                        answer: "$a_{10} = 39, \\quad S_{10} = 210$"
                      }
                    ],
                    traps: "La formula termenului general, înmulțim rația cu $(n-1)$, nu cu $n$! Primul termen nu conține rația.",
                    quiz: {
                      question: "Dacă $a_1 = 2$ și $a_2 = 7$, care este rația progresiei aritmetice?",
                      options: ["5", "9", "3.5", "14"],
                      correctIndex: 0,
                      explanation: "Rația este diferența dintre doi termeni consecutivi: $r = a_2 - a_1 = 7 - 2 = 5$."
                    }
                  }
                ]
              },
              {
                id: "ix-cap2",
                title: "2. Funcția de gradul al II-lea",
                desc: "Forma canonică, ecuația atașată, vârful parabolei, monotonia și semnul funcției.",
                lessons: [
                  {
                    id: "ix-2-1",
                    title: "Graficul, Vârful Parabolei și Semnul Trinomului",
                    duration: "35 min",
                    difficulty: "Esențial BAC",
                    summary: "Coordonatele vârfului $V(-\\frac{b}{2a}, -\\frac{\\Delta}{4a})$, valoarea minimă/maximă și tabelul de semn.",
                    intro: "Funcția $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = ax^2 + bx + c$ ($a \\neq 0$) are drept reprezentare grafică o parabolă cu axa de simetrie paralelă cu $Oy$.",
                    keyFormulas: [
                      {
                        name: "Discriminantul și Vârful parabolei",
                        latex: "\\Delta = b^2 - 4ac, \\quad V\\left(-\\frac{b}{2a}, -\\frac{\\Delta}{4a}\\right)",
                        note: "Dacă $a > 0$, parabola are ramurile în sus și $V$ este punct de minim; dacă $a < 0$, are ramurile în jos și $V$ este punct de maxim."
                      },
                      {
                        name: "Relațiile lui Viète",
                        latex: "S = x_1 + x_2 = -\\frac{b}{a}, \\quad P = x_1 \\cdot x_2 = \\frac{c}{a}",
                        note: "Permit calculul sumei și produsului rădăcinilor fără rezolvarea ecuației."
                      }
                    ],
                    examples: [
                      {
                        problem: "Aflați valoarea minimă a funcției $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = x^2 - 6x + 5$.",
                        steps: [
                          "Identificăm coeficienții: $a = 1$, $b = -6$, $c = 5$.",
                          "Deoarece $a = 1 > 0$, funcția admite un minim egal cu coordonata $y_V = -\\frac{\\Delta}{4a}$.",
                          "Calculăm discriminantul: $\\Delta = b^2 - 4ac = (-6)^2 - 4(1)(5) = 36 - 20 = 16$.",
                          "Calculăm valoarea minimă: $y_V = -\\frac{16}{4(1)} = -4$.",
                          "Minimul este atins în punctul de abscisă $x_V = -\\frac{b}{2a} = -\\frac{-6}{2} = 3$."
                        ],
                        answer: "$y_{\\min} = -4$ atins pentru $x = 3$"
                      }
                    ],
                    traps: "Semnul trinomului când $\\Delta > 0$: 'semnul lui a în afara rădăcinilor și semn contrar lui a între rădăcini'. Nu inversa regula!",
                    quiz: {
                      question: "Pentru $x^2 - 5x + 6 = 0$, suma rădăcinilor $x_1 + x_2$ este:",
                      options: ["5", "-5", "6", "-6"],
                      correctIndex: 0,
                      explanation: "Din relațiile lui Viète: $S = -\\frac{b}{a} = -\\frac{-5}{1} = 5$."
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "x",
            name: "Clasa a X-a",
            numeral: "X",
            desc: "Numere complexe, funcții exponențiale și logaritmice, combinatorică, probabilități și geometrie analitică.",
            examBadge: false,
            chapters: [
              {
                id: "x-cap1",
                title: "1. Funcții exponențiale și logaritmice",
                desc: "Proprietățile logaritmilor, schimbarea bazei și rezolvarea ecuațiilor exponențiale și logaritmice.",
                lessons: [
                  {
                    id: "x-1-1",
                    title: "Logaritmi: Proprietăți și Ecuații Logaritmice",
                    duration: "30 min",
                    difficulty: "Important BAC",
                    summary: "Condiții de existență pentru logaritmi, proprietăți fundamentale și metode de rezolvare a ecuațiilor.",
                    intro: "Logaritmul în baza $a$ din numărul $x$ este puterea la care trebuie ridicată baza $a$ pentru a obține $x$: $\\log_a x = y \\iff a^y = x$.",
                    keyFormulas: [
                      {
                        name: "Condițiile de existență ale logaritmului",
                        latex: "\\log_a x \\text{ există } \\iff x > 0, \\quad a > 0, \\quad a \\neq 1",
                        note: "Obligatoriu de verificat la orice exercițiu de examen!"
                      },
                      {
                        name: "Proprietățile de calcul ale logaritmilor",
                        latex: "\\begin{aligned} \\log_a(x \\cdot y) &= \\log_a x + \\log_a y \\\\ \\log_a\\left(\\frac{x}{y}\\right) &= \\log_a x - \\log_a y \\\\ \\log_a(x^k) &= k \\cdot \\log_a x \\end{aligned}",
                        note: "Pentru toate argumentele strict pozitive."
                      }
                    ],
                    examples: [
                      {
                        problem: "Rezolvați în mulțimea numerelor reale ecuația: $\\log_2(x + 3) + \\log_2(x - 1) = 5$.",
                        steps: [
                          "Condiții de existență: $x + 3 > 0 \\implies x > -3$ și $x - 1 > 0 \\implies x > 1$. Domeniul este $x \\in (1, \\infty)$.",
                          "Aplicăm proprietatea sumei de logaritmi: $\\log_2[(x + 3)(x - 1)] = 5$.",
                          "Trecem la forma exponențială: $(x + 3)(x - 1) = 2^5 = 32$.",
                          "Desfacem parantezele: $x^2 + 2x - 3 = 32 \\implies x^2 + 2x - 35 = 0$.",
                          "Rezolvăm ecuația de gradul 2: $\\Delta = 4 - 4(-35) = 144$.",
                          "Rădăcinile sunt: $x_{1,2} = \\frac{-2 \\pm 12}{2} \\implies x_1 = 5, \\, x_2 = -7$.",
                          "Verificăm condițiile de existență: $-7 \\notin (1, \\infty)$ (se respinge), iar $5 \\in (1, \\infty)$ (soluție validă)."
                        ],
                        answer: "$S = \\{5\\}$"
                      }
                    ],
                    traps: "Nu uita niciodată să verifici condițiile de existență! Mulți elevi pierd puncte prețioase la Bacalaureat acceptând soluții negative care anulează logaritmul.",
                    quiz: {
                      question: "Cât este $\\log_3 81$?",
                      options: ["2", "3", "4", "9"],
                      correctIndex: 2,
                      explanation: "Deoarece $3^4 = 81$, rezultă direct că $\\log_3 81 = 4$."
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "xi",
            name: "Clasa a XI-a",
            numeral: "XI",
            desc: "Algebră liniară (matrice, determinanți, sisteme liniare) și analiză matematică (limite, asimptote, derivate).",
            examBadge: false,
            chapters: [
              {
                id: "xi-cap1",
                title: "1. Matrice și Determinanți",
                desc: "Operații cu matrice, calculul determinanților de ordin 2 și 3 (Sarrus, triunghi), matrice inversabile.",
                lessons: [
                  {
                    id: "xi-1-1",
                    title: "Calculul Determinanților și Inversa unei Matrice",
                    duration: "35 min",
                    difficulty: "Important BAC",
                    summary: "Regula lui Sarrus, calculul $\\det(A)$, matricea transpusă, adjunctă și condiția de inversabilitate $\\det(A) \\neq 0$.",
                    intro: "O matrice pătratică $A \\in \\mathcal{M}_n(\\mathbb{R})$ este inversabilă dacă și numai dacă determinantul său este nenul.",
                    keyFormulas: [
                      {
                        name: "Determinant de ordinul 2",
                        latex: "\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc",
                        note: "Diferența dintre produsul elementelor de pe diagonala principală și cel de pe diagonala secundară."
                      },
                      {
                        name: "Formula inversei unei matrice",
                        latex: "A^{-1} = \\frac{1}{\\det(A)} \\cdot A^*",
                        note: "$A^*$ este matricea adjunctă formată din complemenții algebrici ai elementelor transpusei $A^t$."
                      }
                    ],
                    examples: [
                      {
                        problem: "Calculați inversa matricei $A = \\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$.",
                        steps: [
                          "Calculăm determinantul: $\\det(A) = 2 \\cdot 3 - 1 \\cdot 5 = 6 - 5 = 1$. Deoarece $\\det(A) = 1 \\neq 0$, matricea este inversabilă.",
                          "Pentru o matrice $2 \\times 2$, formula rapidă pentru inversă schimbă elementele de pe diagonala principală și semnele celor de pe diagonala secundară:",
                          "$A^{-1} = \\frac{1}{1} \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$."
                        ],
                        answer: "$A^{-1} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$"
                      }
                    ],
                    traps: "Înmulțirea matricelor NU este comutativă în general: $A \\cdot B \\neq B \\cdot A$! Nu aplica proprietățile numerelor reale la matrice fără justificare.",
                    quiz: {
                      question: "Dacă $\\det(A) = 0$, matricea $A$ este:",
                      options: ["Inversabilă", "Singulară (neinversabilă)", "Matrice nulă", "Matrice unitate"],
                      correctIndex: 1,
                      explanation: "O matrice cu determinant 0 se numește singulară și nu admite inversă."
                    }
                  }
                ]
              },
              {
                id: "xi-cap2",
                title: "2. Analiză: Derivata unei funcții",
                desc: "Definiția derivatei, tabelul de derivate elementare, reguli de derivare și ecuația tangentei la grafic.",
                lessons: [
                  {
                    id: "xi-2-1",
                    title: "Tabelul derivatelor uzuale și Ecuația Tangentei",
                    duration: "40 min",
                    difficulty: "Esențial BAC",
                    summary: "Formule de derivare, derivarea compusă, panta tangentei și determinarea ecuației dreptei tangente.",
                    intro: "Derivata unei funcții într-un punct reprezintă viteza de variație a funcției și panta tangentei la graficul funcției în acel punct.",
                    keyFormulas: [
                      {
                        name: "Ecuația tangentei la grafic în punctul x0",
                        latex: "y - f(x_0) = f'(x_0)(x - x_0)",
                        note: "Panta tangentei este $m = f'(x_0)$."
                      },
                      {
                        name: "Regula produsului și a câtului",
                        latex: "(f \\cdot g)' = f'g + fg', \\quad \\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2}",
                        note: "Pentru orice funcții derivabile cu $g(x) \\neq 0$."
                      }
                    ],
                    examples: [
                      {
                        problem: "Determinați ecuația tangentei la graficul funcției $f(x) = x^3 - 3x + 2$ în punctul de abscisă $x_0 = 2$.",
                        steps: [
                          "Calculăm valoarea funcției în punct: $f(2) = 2^3 - 3(2) + 2 = 8 - 6 + 2 = 4$. Deci punctul de contact este $A(2, 4)$.",
                          "Calculăm derivata funcției: $f'(x) = (x^3 - 3x + 2)' = 3x^2 - 3$.",
                          "Calculăm panta tangentei: $f'(2) = 3(2^2) - 3 = 12 - 3 = 9$.",
                          "Scriem ecuația tangentei: $y - 4 = 9(x - 2) \\implies y - 4 = 9x - 18 \\implies y = 9x - 14$."
                        ],
                        answer: "$y = 9x - 14$"
                      }
                    ],
                    traps: "La derivarea câtului $\\left(\\frac{f}{g}\\right)'$, numărătorul este $f'g - fg'$ (cu minus!), nu cu plus ca la produs.",
                    quiz: {
                      question: "Derivata funcției $f(x) = e^x + \\ln x$ este:",
                      options: ["e^x + 1/x", "x e^{x-1} + 1/x", "e^x + x", "e^x - 1/x^2"],
                      correctIndex: 0,
                      explanation: "$(e^x)' = e^x$ și $(\\ln x)' = \\frac{1}{x}$."
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "xii",
            name: "Clasa a XII-a",
            numeral: "XII",
            desc: "Structuri algebrice (legi de compoziție, grupuri, inele, corpuri, polinoame) și Calcul integral (primitive, integrale definite).",
            examBadge: true,
            chapters: [
              {
                id: "xii-cap1",
                title: "1. Legi de compoziție și Grupuri",
                desc: "Parte stabilă, asociativitate, element neutru, elemente simetrizabile, comutativitate și izomorfisme.",
                lessons: [
                  {
                    id: "xii-1-1",
                    title: "Proprietățile Legilor de Compoziție și Elementul Neutru",
                    duration: "30 min",
                    difficulty: "Esențial BAC",
                    summary: "Axiomele unui grup $(G, *)$, verificarea elementului neutru $e$ și calculul simetricului $x'$.",
                    intro: "O lege de compoziție pe o mulțime $M$ este o operație binară $*$ care asociază oricărei perechi $(x, y) \\in M \\times M$ un element unic $x * y \\in M$.",
                    keyFormulas: [
                      {
                        name: "Element neutru și simetric",
                        latex: "\\begin{aligned} \\text{Element neutru } e: & \\quad x * e = e * x = x, \\, \\forall x \\in M \\\\ \\text{Element simetric } x': & \\quad x * x' = x' * x = e \\end{aligned}",
                        note: "Elementul neutru, dacă există, este unic."
                      }
                    ],
                    examples: [
                      {
                        problem: "Pe $\\mathbb{R}$ se definește legea de compoziție $x * y = xy - 3x - 3y + 12$. Arătați că $x * y = (x - 3)(y - 3) + 3$ și aflați elementul neutru.",
                        steps: [
                          "Desfacem membrul drept: $(x - 3)(y - 3) + 3 = xy - 3x - 3y + 9 + 3 = xy - 3x - 3y + 12$, ceea ce este identic cu legea dată.",
                          "Căutăm $e \\in \\mathbb{R}$ astfel încât $x * e = x$, pentru orice $x$:",
                          "$(x - 3)(e - 3) + 3 = x \\implies (x - 3)(e - 3) = x - 3$.",
                          "Deoarece relația trebuie să aibă loc pentru orice $x \\in \\mathbb{R}$, rezultă $e - 3 = 1 \\implies e = 4$."
                        ],
                        answer: "$e = 4$"
                      }
                    ],
                    traps: "Când demonstrezi că $e$ este element neutru, trebuie să verifici AMBELE egalități ($x * e = x$ și $e * x = x$), cu excepția cazului în care ai arătat în prealabil că legea este comutativă.",
                    quiz: {
                      question: "Dacă $x * y = (x-2)(y-2) + 2$, care este elementul neutru al legii?",
                      options: ["2", "3", "0", "1"],
                      correctIndex: 1,
                      explanation: "$(x-2)(e-2)+2 = x \\implies (x-2)(e-2) = x-2 \\implies e-2 = 1 \\implies e = 3$."
                    }
                  }
                ]
              },
              {
                id: "xii-cap2",
                title: "2. Integrala Definită (Formula Leibniz-Newton)",
                desc: "Proprietățile integralei definite, integrarea prin părți, schimbarea de variabilă și calculul ariilor și volumelor corpurilor de rotație.",
                lessons: [
                  {
                    id: "xii-2-1",
                    title: "Formula Leibniz-Newton și Metode Fundamentale de Integrare",
                    duration: "40 min",
                    difficulty: "Esențial BAC",
                    summary: "Calculul $\\int_a^b f(x)dx = F(b) - F(a)$, integrarea prin părți $\\int u v' = uv - \\int u'v$ și aplicații.",
                    intro: "Integrala definită reprezintă limita sumelor Riemann și măsoară aria cu semn a suprafeței cuprinse între graficul funcției, axa $Ox$ și dreptele $x = a, x = b$.",
                    keyFormulas: [
                      {
                        name: "Formula Leibniz-Newton",
                        latex: "\\int_a^b f(x)\\,dx = F(b) - F(a) = \\left. F(x) \\right|_a^b",
                        note: "Unde $F$ este o primitivă a funcției continue $f$ pe $[a, b]$."
                      },
                      {
                        name: "Integrarea prin părți",
                        latex: "\\int_a^b u(x)v'(x)\\,dx = \\left. u(x)v(x) \\right|_a^b - \\int_a^b u'(x)v(x)\\,dx",
                        note: "Alegem $u(x)$ după regula 'L.I.A.T.E.' (Logaritm, Inversă trig., Algebrică, Trig., Exponențială)."
                      },
                      {
                        name: "Volumul corpului de rotație",
                        latex: "\\text{Vol}(C_f) = \\pi \\int_a^b f^2(x)\\,dx",
                        note: "Volumul corpului obținut prin rotirea subgraficului în jurul axei Ox."
                      }
                    ],
                    examples: [
                      {
                        problem: "Calculați integrala: $I = \\int_0^1 x e^x \\, dx$.",
                        steps: [
                          "Aplicăm formula integrării prin părți:",
                          "Alegem: $u(x) = x \\implies u'(x) = 1$",
                          "Alegem: $v'(x) = e^x \\implies v(x) = e^x$",
                          "Scriem formula: $\\int_0^1 x e^x dx = \\left. x e^x \\right|_0^1 - \\int_0^1 1 \\cdot e^x dx$",
                          "Calculăm prima parte: $(1 \\cdot e^1) - (0 \\cdot e^0) = e - 0 = e$",
                          "Calculăm a doua integrală: $\\int_0^1 e^x dx = \\left. e^x \\right|_0^1 = e^1 - e^0 = e - 1$",
                          "Scădem rezultatele: $I = e - (e - 1) = e - e + 1 = 1$."
                        ],
                        answer: "$I = 1$"
                      }
                    ],
                    traps: "La schimbarea de variabilă în integrala definită, NU UITA să schimbi capetele de integrare! De asemenea, verifică dacă funcția este continuă pe întreg intervalul $[a, b]$.",
                    quiz: {
                      question: "Valoarea integralei $\\int_0^2 3x^2 dx$ este:",
                      options: ["6", "8", "12", "24"],
                      correctIndex: 1,
                      explanation: "O primitivă este $x^3$. Aplicând formula Leibniz-Newton: $\\left. x^3 \\right|_0^2 = 2^3 - 0^3 = 8$."
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    };



if (typeof window !== "undefined") { window.CURRICULUM = CURRICULUM; }
if (typeof module !== "undefined" && module.exports) { module.exports = { CURRICULUM }; }
