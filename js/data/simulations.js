/**
 * MATEHUB - EXAM SIMULATIONS DATABASE
 * Simulări oficiale Evaluare Națională (Clasa a VIII-a) & Bacalaureat (Clasa a XII-a)
 */

    const SIMULATIONS_DB = {
      en: {
        id: "en",
        title: "Simulare Evaluare Națională - Matematică",
        subtitle: "Clasa a VIII-a • 120 de minute • Toate subiectele sunt obligatorii",
        durationMinutes: 120,
        subiecte: {
          sub1: {
            title: "Subiectul I (30 puncte) - Încercuiește litera corespunzătoare răspunsului corect",
            items: [
              {
                num: 1,
                text: "Rezultatul calculului $40 - 20 : 2$ este egal cu:",
                options: ["10", "30", "20", "0"],
                correctIndex: 1,
                lessonId: "v-1-1",
                lessonName: "Operații cu numere naturale și ordinea efectuării operațiilor",
                explanation: "Ordinea efectuării operațiilor impune să facem mai întâi împărțirea: $20 : 2 = 10$, apoi scăderea: $40 - 10 = 30$."
              },
              {
                num: 2,
                text: "Un obiect costă 120 lei. După o reducere de preț cu $25\\%$, noul preț al obiectului este:",
                options: ["95 lei", "90 lei", "100 lei", "85 lei"],
                correctIndex: 1,
                lessonId: "vi-1-1",
                lessonName: "Proprietatea fundamentală a proporțiilor și Procente",
                explanation: "Calculăm reducerea: $25\\% \\text{ din } 120 = \\frac{1}{4} \\cdot 120 = 30$ lei. Prețul redus: $120 - 30 = 90$ lei."
              },
              {
                num: 3,
                text: "Numărul elementelor mulțimii $A = \\{x \\in \\mathbb{Z} \\mid -3 \\le x < 2\\}$ este egal cu:",
                options: ["4", "5", "6", "3"],
                correctIndex: 1,
                lessonId: "viii-1-1",
                lessonName: "Mulțimi și intervale de numere reale",
                explanation: "Elementele întregi sunt $\\{-3, -2, -1, 0, 1\\}$. În total sunt 5 elemente."
              },
              {
                num: 4,
                text: "Cel mai mare număr natural din intervalul $(-\\infty, 3\\sqrt{2})$ este:",
                options: ["3", "4", "5", "6"],
                correctIndex: 1,
                lessonId: "vii-1-1",
                lessonName: "Radicali. Proprietăți și Raționalizarea numitorului",
                explanation: "$3\\sqrt{2} = \\sqrt{18}$. Deoarece $16 < 18 < 25$, avem $4 < \\sqrt{18} < 5$. Cel mai mare număr natural este 4."
              },
              {
                num: 5,
                text: "Media geometrică a numerelor $a = 4$ și $b = 9$ este egală cu:",
                options: ["6.5", "6", "13", "36"],
                correctIndex: 1,
                lessonId: "vii-1-1",
                lessonName: "Radicali și medii în mulțimea numerelor reale",
                explanation: "$m_g = \\sqrt{a \\cdot b} = \\sqrt{4 \\cdot 9} = \\sqrt{36} = 6$."
              },
              {
                num: 6,
                text: "Într-o urnă sunt 15 bile albe și 10 bile negre. Probabilitatea ca, extrăgând la întâmplare o bilă, aceasta să fie neagră este:",
                options: ["2/5", "3/5", "1/2", "2/3"],
                correctIndex: 0,
                lessonId: "vi-1-1",
                lessonName: "Rapoarte și probabilități",
                explanation: "$P = \\frac{\\text{cazuri favorabile}}{\\text{cazuri posibile}} = \\frac{10}{25} = \\frac{2}{5}$."
              }
            ]
          },
          sub2: {
            title: "Subiectul II (30 puncte) - Geometrie plană și în spațiu",
            items: [
              {
                num: 1,
                text: "În triunghiul dreptunghic $ABC$ cu $\\widehat{A} = 90^\\circ$, avem $AB = 6\\text{ cm}$ și $AC = 8\\text{ cm}$. Lungimea ipotenuzei $BC$ este:",
                options: ["14 cm", "10 cm", "12 cm", "7 cm"],
                correctIndex: 1,
                lessonId: "vii-2-1",
                lessonName: "Teorema lui Pitagora și Teorema Catetei",
                explanation: "Pitagora: $BC^2 = 6^2 + 8^2 = 36 + 64 = 100 \\implies BC = 10\\text{ cm}$."
              },
              {
                num: 2,
                text: "Două unghiuri adiacente suplementare au raportul măsurilor egal cu $\\frac{1}{2}$. Măsura unghiului mai mic este:",
                options: ["60°", "90°", "30°", "45°"],
                correctIndex: 0,
                lessonId: "vi-2-1",
                lessonName: "Unghiuri și proprietăți geometrice",
                explanation: "Fie $x$ și $2x$ unghiurile. $x + 2x = 180^\\circ \\implies 3x = 180^\\circ \\implies x = 60^\\circ$."
              },
              {
                num: 3,
                text: "Aria unui pătrat este egală cu $64\\text{ cm}^2$. Perimetrul acestui pătrat este egal cu:",
                options: ["16 cm", "32 cm", "64 cm", "24 cm"],
                correctIndex: 1,
                lessonId: "vii-cap2",
                lessonName: "Patrulatere și arii",
                explanation: "$L^2 = 64 \\implies L = 8\\text{ cm}$. Perimetrul este $4L = 4 \\cdot 8 = 32\\text{ cm}$."
              },
              {
                num: 4,
                text: "Înălțimea unui triunghi echilateral cu latura de $6\\text{ cm}$ este:",
                options: ["$6\\sqrt{3}\\text{ cm}$", "$3\\sqrt{3}\\text{ cm}$", "$3\\text{ cm}$", "$9\\text{ cm}$"],
                correctIndex: 1,
                lessonId: "vii-2-1",
                lessonName: "Relații metrice și triunghiul echilateral",
                explanation: "$h = \\frac{l\\sqrt{3}}{2} = \\frac{6\\sqrt{3}}{2} = 3\\sqrt{3}\\text{ cm}$."
              },
              {
                num: 5,
                text: "Secțiunea axială a unui con circular drept este un triunghi echilateral cu latura de $10\\text{ cm}$. Generatoarea conului este de:",
                options: ["5 cm", "10 cm", "8 cm", "12 cm"],
                correctIndex: 1,
                lessonId: "viii-3-1",
                lessonName: "Cilindrul, Conul circular drept și Sfera",
                explanation: "Secțiunea axială este $\\triangle VAB$ isoscel cu $VA = VB = G$ și $AB = 2R$. Fiind echilateral, $G = 10\\text{ cm}$."
              },
              {
                num: 6,
                text: "Diagonala unui cub cu muchia de $4\\text{ cm}$ are lungimea egală cu:",
                options: ["$4\\sqrt{2}\\text{ cm}$", "$4\\sqrt{3}\\text{ cm}$", "$8\\text{ cm}$", "$12\\text{ cm}$"],
                correctIndex: 1,
                lessonId: "viii-3-1",
                lessonName: "Geometrie în spațiu: Poliedre și corpuri",
                explanation: "Diagonala cubului este $d = l\\sqrt{3} = 4\\sqrt{3}\\text{ cm}$."
              }
            ]
          },
          sub3: {
            title: "Subiectul III (30 puncte) - Scrieți rezolvările complete",
            items: [
              {
                num: 1,
                problem: "Se consideră expresia algebrică $E(x) = (2x - 3)^2 - 2(2x - 3)(x + 1) + (x + 1)^2$. Arătați că $E(x) = (x - 4)^2$, oricare ar fi $x \\in \\mathbb{R}$.",
                maxPoints: 5,
                lessonId: "viii-1-1",
                lessonName: "Formule de calcul prescurtat și Descompuneri în factori",
                barem: [
                  "2 pct - Recunoașterea formei $A^2 - 2AB + B^2 = (A - B)^2$, unde $A = 2x - 3, B = x + 1$",
                  "2 pct - Calculul parantezei: $(2x - 3) - (x + 1) = x - 4$",
                  "1 pct - Concluzie: $E(x) = (x - 4)^2$"
                ],
                solution: "$E(x) = [(2x - 3) - (x + 1)]^2 = (2x - 3 - x - 1)^2 = (x - 4)^2$."
              },
              {
                num: 2,
                problem: "Fie funcția $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = 2x - 4$. Determinați aria triunghiului determinat de graficul funcției $f$ cu axele de coordonate $Ox$ și $Oy$.",
                maxPoints: 5,
                lessonId: "viii-2-1",
                lessonName: "Funcția liniară f(x) = ax + b: Grafic și Intersecții cu Axele",
                barem: [
                  "2 pct - Determinarea intersecției cu $Ox$: $f(x) = 0 \\implies A(2, 0) \\implies OA = 2$",
                  "2 pct - Determinarea intersecției cu $Oy$: $f(0) = -4 \\implies B(0, -4) \\implies OB = 4$",
                  "1 pct - Aria $\\mathcal{A}_{\\triangle AOB} = \\frac{OA \\cdot OB}{2} = \\frac{2 \\cdot 4}{2} = 4$"
                ],
                solution: "$G_f \\cap Ox = A(2, 0), G_f \\cap Oy = B(0, -4) \\implies \\mathcal{A} = \\frac{2 \\cdot 4}{2} = 4$ unități."
              },
              {
                num: 3,
                problem: "Un con circular drept are raza $R = 6\\text{ cm}$ și înălțimea $h = 8\\text{ cm}$. Aflați volumul conului.",
                maxPoints: 5,
                lessonId: "viii-3-1",
                lessonName: "Cilindrul, Conul circular drept și Sfera",
                barem: [
                  "2 pct - Scrierea formulei volumului: $V = \\frac{1}{3}\\pi R^2 h$",
                  "2 pct - Înlocuirea valorilor: $V = \\frac{1}{3}\\pi (36)(8)$",
                  "1 pct - Calcul final: $V = 96\\pi\\text{ cm}^3$"
                ],
                solution: "$V = \\frac{1}{3}\\pi \\cdot 6^2 \\cdot 8 = 12 \\cdot 8 \\cdot \\pi = 96\\pi\\text{ cm}^3$."
              }
            ]
          }
        }
      },

      bac: {
        id: "bac",
        title: "Simulare Bacalaureat Matematică (M1 / M2)",
        subtitle: "Clasa a XII-a • 180 de minute • Toate subiectele sunt obligatorii",
        durationMinutes: 180,
        subiecte: {
          sub1: {
            title: "Subiectul I (30 puncte) - Exerciții din materia claselor IX - X",
            items: [
              {
                num: 1,
                text: "Fie progresia aritmetică $(a_n)_{n\\ge 1}$ cu $a_1 = 3$ și rația $r = 4$. Termenul $a_{10}$ este egal cu:",
                options: ["39", "43", "36", "40"],
                correctIndex: 0,
                lessonId: "ix-1-1",
                lessonName: "Progresii aritmetice: Termen general și Sumă",
                explanation: "$a_{10} = a_1 + 9r = 3 + 9 \\cdot 4 = 3 + 36 = 39$."
              },
              {
                num: 2,
                text: "Valoarea minimă a funcției $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = x^2 - 6x + 5$ este:",
                options: ["-4", "5", "-5", "3"],
                correctIndex: 0,
                lessonId: "ix-2-1",
                lessonName: "Graficul, Vârful Parabolei și Semnul Trinomului",
                explanation: "Minimul este $y_V = -\\frac{\\Delta}{4a}$. $\\Delta = 36 - 20 = 16 \\implies y_V = -\\frac{16}{4} = -4$."
              },
              {
                num: 3,
                text: "Soluția reală a ecuației logaritmice $\\log_2(x + 3) = 3$ este:",
                options: ["5", "6", "9", "3"],
                correctIndex: 0,
                lessonId: "x-1-1",
                lessonName: "Logaritmi: Proprietăți și Ecuații Logaritmice",
                explanation: "$x + 3 = 2^3 = 8 \\implies x = 8 - 3 = 5 > -3$ (verifică condiția de existență)."
              },
              {
                num: 4,
                text: "Calculați probabilitatea ca, alegând un număr din mulțimea numerelor naturale de două cifre, acesta să fie pătrat perfect:",
                options: ["1/15", "6/90", "2/45", "7/90"],
                correctIndex: 1,
                lessonId: "x-cap1",
                lessonName: "Matematici financiare și probabilități",
                explanation: "Sunt 90 numere de două cifre (10-99). Pătratele perfecte sunt $\\{16, 25, 36, 49, 64, 81\\}$ (6 numere). $P = \\frac{6}{90} = \\frac{1}{15}$."
              },
              {
                num: 5,
                text: "În reperul cartezian $xOy$ se consideră punctele $A(1, 2)$ și $B(5, 6)$. Mijlocul segmentului $AB$ are coordonatele:",
                options: ["(3, 4)", "(2, 3)", "(4, 4)", "(6, 8)"],
                correctIndex: 0,
                lessonId: "ix-cap2",
                lessonName: "Geometrie analitică și vectori în plan",
                explanation: "$M\\left(\\frac{1+5}{2}, \\frac{2+6}{2}\\right) = M(3, 4)$."
              },
              {
                num: 6,
                text: "Dacă $x \\in (0, \\pi/2)$ și $\\sin x = \\frac{3}{5}$, atunci $\\cos x$ este egal cu:",
                options: ["4/5", "2/5", "3/4", "1/5"],
                correctIndex: 0,
                lessonId: "ix-cap2",
                lessonName: "Trigonometrie și aplicații în geometrie",
                explanation: "$\\cos^2 x = 1 - \\sin^2 x = 1 - \\frac{9}{25} = \\frac{16}{25} \\implies \\cos x = \\frac{4}{5}$ în primul cadran."
              }
            ]
          },
          sub2: {
            title: "Subiectul II (30 puncte) - Algebră (Clasele XI - XII)",
            items: [
              {
                num: 1,
                problem: "Se consideră matricea $A = \\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$. Arătați că $\\det(A) = 1$ și determinați matricea inversă $A^{-1}$.",
                maxPoints: 15,
                lessonId: "xi-1-1",
                lessonName: "Calculul Determinanților și Inversa unei Matrice",
                barem: [
                  "5 pct - Calculul determinantului: $\\det(A) = 2 \\cdot 3 - 1 \\cdot 5 = 1$",
                  "5 pct - Constatarea că $\\det(A) \\neq 0 \\implies A$ inversabilă",
                  "5 pct - Scrierea corectă a inversei: $A^{-1} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$"
                ],
                solution: "$\\det(A) = 6 - 5 = 1$. Inversa este $A^{-1} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$."
              },
              {
                num: 2,
                problem: "Pe $\\mathbb{R}$ se definește legea de compoziție $x * y = xy - 3x - 3y + 12$. Arătați că $x * y = (x - 3)(y - 3) + 3$ și determinați elementul neutru.",
                maxPoints: 15,
                lessonId: "xii-1-1",
                lessonName: "Proprietățile Legilor de Compoziție și Elementul Neutru",
                barem: [
                  "5 pct - Desfacerea parantezelor $(x - 3)(y - 3) + 3 = xy - 3x - 3y + 12$",
                  "5 pct - Scrierea ecuației $x * e = x \\implies (x - 3)(e - 3) + 3 = x$",
                  "5 pct - Aflarea elementului neutru $e = 4$"
                ],
                solution: "$(x - 3)(e - 3) = x - 3 \\implies e - 3 = 1 \\implies e = 4$."
              }
            ]
          },
          sub3: {
            title: "Subiectul III (30 puncte) - Analiză Matematică (Clasele XI - XII)",
            items: [
              {
                num: 1,
                problem: "Fie funcția $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = x^3 - 3x + 2$. Determinați derivata $f'(x)$ și ecuația tangentei la grafic în punctul de abscisă $x_0 = 2$.",
                maxPoints: 15,
                lessonId: "xi-2-1",
                lessonName: "Tabelul derivatelor uzuale și Ecuația Tangentei",
                barem: [
                  "5 pct - Calculul derivatei: $f'(x) = 3x^2 - 3$",
                  "5 pct - Calculul valorilor $f(2) = 4$ și $f'(2) = 9$",
                  "5 pct - Scrierea ecuației tangentei: $y - 4 = 9(x - 2) \\implies y = 9x - 14$"
                ],
                solution: "$f'(x) = 3x^2 - 3$, panta $m = 9$, tangenta: $y = 9x - 14$."
              },
              {
                num: 2,
                problem: "Calculați integrala definită $I = \\int_0^1 x e^x \\, dx$ folosind metoda integrării prin părți.",
                maxPoints: 15,
                lessonId: "xii-2-1",
                lessonName: "Formula Leibniz-Newton și Metode Fundamentale de Integrare",
                barem: [
                  "5 pct - Alegerea funcțiilor: $u = x \\implies u' = 1$, $v' = e^x \\implies v = e^x$",
                  "5 pct - Aplicarea formulei: $\\left. x e^x \\right|_0^1 - \\int_0^1 e^x dx$",
                  "5 pct - Finalizare: $e - (e - 1) = 1$"
                ],
                solution: "$I = (1 \\cdot e - 0) - (e - 1) = 1$."
              }
            ]
          }
        }
      }
    };



if (typeof window !== "undefined") { window.SIMULATIONS_DB = SIMULATIONS_DB; }
if (typeof module !== "undefined" && module.exports) { module.exports = { SIMULATIONS_DB }; }
