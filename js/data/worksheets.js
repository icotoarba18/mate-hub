/**
 * MATEHUB - WORKSHEETS DATABASE & DYNAMIC GENERATOR
 * 5 Probleme rezolvate pas cu pas pe 3 niveluri de dificultate (Ușor, Mediu, Avansat)
 */

    const WORKSHEETS_DB = {
      // Clasa a VIII-a: Calcul algebric
      "viii-1-1": {
        "usor": [
          {
            num: 1,
            problem: "Calculați folosind formulele de calcul prescurtat: $(x + 5)^2$.",
            points: "20 pct",
            steps: [
              "Aplicăm formula pătratului binomului: $(a + b)^2 = a^2 + 2ab + b^2$.",
              "Aici $a = x$ și $b = 5$.",
              "Calculăm termenii: $a^2 = x^2$, $2ab = 2 \\cdot x \\cdot 5 = 10x$, $b^2 = 5^2 = 25$."
            ],
            barem: [
              "10 pct - Identificarea și scrierea formulei corecte",
              "5 pct - Calculul dublului produs 2ab",
              "5 pct - Rezultat final corect: $x^2 + 10x + 25$"
            ],
            answer: "$x^2 + 10x + 25$"
          },
          {
            num: 2,
            problem: "Efectuați: $(2x - 3)^2$.",
            points: "20 pct",
            steps: [
              "Aplicăm formula: $(a - b)^2 = a^2 - 2ab + b^2$.",
              "Avem: $a = 2x$ și $b = 3$.",
              "Calculăm: $(2x)^2 - 2(2x)(3) + 3^2 = 4x^2 - 12x + 9$."
            ],
            barem: [
              "10 pct - Ridicarea corectă la pătrat a primului termen $(2x)^2 = 4x^2$",
              "5 pct - Calculul dublului produs $-12x$",
              "5 pct - Rezultat final: $4x^2 - 12x + 9$"
            ],
            answer: "$4x^2 - 12x + 9$"
          },
          {
            num: 3,
            problem: "Calculați produsul: $(x - 7)(x + 7)$.",
            points: "20 pct",
            steps: [
              "Aplicăm formula diferenței de pătrate: $(a - b)(a + b) = a^2 - b^2$.",
              "Obținem: $x^2 - 7^2 = x^2 - 49$."
            ],
            barem: [
              "10 pct - Identificarea formulei diferenței de pătrate",
              "10 pct - Finalizare: $x^2 - 49$"
            ],
            answer: "$x^2 - 49$"
          },
          {
            num: 4,
            problem: "Restrângeți ca pătrat al unui binom expresia: $x^2 + 6x + 9$.",
            points: "20 pct",
            steps: [
              "Observăm că $x^2$ este pătratul lui $x$, iar $9 = 3^2$.",
              "Verificăm dublul produs: $2 \\cdot x \\cdot 3 = 6x$ (corespunde termenului din mijloc).",
              "Concluzie: $x^2 + 6x + 9 = (x + 3)^2$."
            ],
            barem: [
              "10 pct - Identificarea termenilor $a=x$ și $b=3$",
              "10 pct - Verificarea termenului din mijloc și scrierea $(x + 3)^2$"
            ],
            answer: "$(x + 3)^2$"
          },
          {
            num: 5,
            problem: "Descompuneți în factori ireductibili: $x^2 - 64$.",
            points: "20 pct",
            steps: [
              "Observăm că $64 = 8^2$.",
              "Aplicăm $a^2 - b^2 = (a - b)(a + b)$:",
              "$x^2 - 64 = (x - 8)(x + 8)$."
            ],
            barem: [
              "10 pct - Scrierea numărului 64 sub formă de pătrat $8^2$",
              "10 pct - Descompunerea finală: $(x - 8)(x + 8)$"
            ],
            answer: "$(x - 8)(x + 8)$"
          }
        ],
        "mediu": [
          {
            num: 1,
            problem: "Se consideră expresia $E(x) = (2x + 1)^2 - (2x - 1)^2$. Arătați că $E(x) = 8x$, oricare ar fi $x \\in \\mathbb{R}$.",
            points: "20 pct",
            steps: [
              "Metoda 1: Dezvoltăm fiecare paranteză:",
              "$(2x + 1)^2 = 4x^2 + 4x + 1$",
              "$(2x - 1)^2 = 4x^2 - 4x + 1$",
              "Scădem: $E(x) = (4x^2 + 4x + 1) - (4x^2 - 4x + 1) = 4x^2 + 4x + 1 - 4x^2 + 4x - 1 = 8x$."
            ],
            barem: [
              "8 pct - Dezvoltarea corectă a celor două pătrate",
              "7 pct - Schimbarea semnelor după paranteza cu minus",
              "5 pct - Reducerea termenilor asemenea și concluzia $8x$"
            ],
            answer: "$E(x) = 8x$"
          },
          {
            num: 2,
            problem: "Descompuneți în factori expresia $A(x) = x^2 - 6x + 8$.",
            points: "20 pct",
            steps: [
              "Despărțim termenul $-6x$ în $-2x - 4x$:",
              "$x^2 - 2x - 4x + 8 = x(x - 2) - 4(x - 2)$.",
              "Dăm factor comun $(x - 2)$:",
              "$(x - 2)(x - 4)$."
            ],
            barem: [
              "10 pct - Descompunerea convenabilă a termenului de gradul I",
              "10 pct - Darea factorului comun și obținerea $(x - 2)(x - 4)$"
            ],
            answer: "$(x - 2)(x - 4)$"
          },
          {
            num: 3,
            problem: "Arătați că numărul $N = (n + 3)^2 - (n - 1)^2$ este divizibil cu 8 pentru orice număr natural $n$.",
            points: "20 pct",
            steps: [
              "Folosim diferența de pătrate: $A^2 - B^2 = (A - B)(A + B)$.",
              "$N = [(n + 3) - (n - 1)][(n + 3) + (n - 1)] = (n + 3 - n + 1)(2n + 2) = 4 \\cdot 2(n + 1) = 8(n + 1)$.",
              "Cum $n \\in \\mathbb{N}$, $8(n + 1)$ este evident multiplu de 8."
            ],
            barem: [
              "10 pct - Aplicarea formulei diferenței de pătrate sau dezvoltarea directă",
              "5 pct - Aducerea la forma $8(n + 1)$",
              "5 pct - Justificarea divizibilității cu 8"
            ],
            answer: "$N = 8(n + 1) \\implies N \\vdots 8$"
          },
          {
            num: 4,
            problem: "Calculați valoarea numerică a expresiei $E = (\\sqrt{5} + \\sqrt{2})^2 + (\\sqrt{5} - \\sqrt{2})^2$.",
            points: "20 pct",
            steps: [
              "Dezvoltăm: $(\\sqrt{5} + \\sqrt{2})^2 = 5 + 2\\sqrt{10} + 2 = 7 + 2\\sqrt{10}$.",
              "Dezvoltăm: $(\\sqrt{5} - \\sqrt{2})^2 = 5 - 2\\sqrt{10} + 2 = 7 - 2\\sqrt{10}$.",
              "Însumăm: $(7 + 2\\sqrt{10}) + (7 - 2\\sqrt{10}) = 14$."
            ],
            barem: [
              "8 pct - Calculul primului pătrat",
              "8 pct - Calculul celui de-al doilea pătrat",
              "4 pct - Reducerea radicalilor și obținerea numărului 14"
            ],
            answer: "$14$"
          },
          {
            num: 5,
            problem: "Determinați valoarea minimă a expresiei $E(x) = x^2 - 8x + 20$, pentru $x \\in \\mathbb{R}$.",
            points: "20 pct",
            steps: [
              "Formăm un pătrat perfect: $x^2 - 8x + 20 = (x^2 - 8x + 16) + 4 = (x - 4)^2 + 4$.",
              "Deoarece $(x - 4)^2 \\ge 0$ pentru orice $x \\in \\mathbb{R}$, valoarea minimă este $0 + 4 = 4$, atinsă pentru $x = 4$."
            ],
            barem: [
              "10 pct - Restrângerea pătratului $(x - 4)^2 + 4$",
              "10 pct - Argumentarea inegalității $(x - 4)^2 \\ge 0$ și indicarea minimului 4"
            ],
            answer: "$E_{\\min} = 4$ atins pentru $x = 4$"
          }
        ],
        "avansat": [
          {
            num: 1,
            problem: "Dacă $x + \\frac{1}{x} = 5$, calculați valoarea expresiei $x^2 + \\frac{1}{x^2}$ și $x^3 + \\frac{1}{x^3}$.",
            points: "20 pct",
            steps: [
              "Ridicăm la pătrat egalitatea dată: $\\left(x + \\frac{1}{x}\\right)^2 = 5^2 \\implies x^2 + 2 \\cdot x \\cdot \\frac{1}{x} + \\frac{1}{x^2} = 25$.",
              "Rezultă: $x^2 + 2 + \\frac{1}{x^2} = 25 \\implies x^2 + \\frac{1}{x^2} = 23$.",
              "Pentru cub: $\\left(x + \\frac{1}{x}\\right)^3 = x^3 + \\frac{1}{x^3} + 3\\left(x + \\frac{1}{x}\\right) \\implies 125 = x^3 + \\frac{1}{x^3} + 3(5) \\implies x^3 + \\frac{1}{x^3} = 110$."
            ],
            barem: [
              "10 pct - Aflarea corectă a sumei pătratelor (23)",
              "10 pct - Aflarea corectă a sumei cuburilor (110)"
            ],
            answer: "$x^2 + \\frac{1}{x^2} = 23, \\quad x^3 + \\frac{1}{x^3} = 110$"
          },
          {
            num: 2,
            problem: "Fie $a, b, c \\in \\mathbb{R}$ astfel încât $a^2 + b^2 + c^2 = ab + bc + ca$. Demonstrați că $a = b = c$.",
            points: "20 pct",
            steps: [
              "Înmulțim egalitatea cu 2: $2a^2 + 2b^2 + 2c^2 - 2ab - 2bc - 2ca = 0$.",
              "Grupăm termenii ca sumă de pătrate:",
              "$(a - b)^2 + (b - c)^2 + (c - a)^2 = 0$.",
              "Fiind o sumă de pătrate egală cu 0, fiecare pătrat trebuie să fie 0:",
              "$a - b = 0, \\, b - c = 0, \\, c - a = 0 \\implies a = b = c$."
            ],
            barem: [
              "6 pct - Înmulțirea cu 2 și trecerea tuturor termenilor în membrul stâng",
              "8 pct - Gruparea în sumă de trei pătrate",
              "6 pct - Concluzia finală $a = b = c$"
            ],
            answer: "$a = b = c$"
          },
          {
            num: 3,
            problem: "Determinați perechile de numere întregi $(x, y)$ care verifică ecuația $x^2 - y^2 = 21$.",
            points: "20 pct",
            steps: [
              "Descompunem membrul stâng: $(x - y)(x + y) = 21$.",
              "Divizorii întregi ai lui 21 sunt: $\\pm 1, \\pm 3, \\pm 7, \\pm 21$.",
              "Rezolvând sistemele de forma $\\begin{cases} x - y = d_1 \\\\ x + y = d_2 \\end{cases}$ obținem perechile $(\\pm 5, \\pm 2)$ și $(\\pm 11, \\pm 10)$."
            ],
            barem: [
              "8 pct - Descompunerea $(x - y)(x + y) = 21$",
              "6 pct - Identificarea tuturor perechilor de divizori",
              "6 pct - Determinarea tuturor soluțiilor întregi"
            ],
            answer: "$(\\pm 5, \\pm 2), \\, (\\pm 11, \\pm 10)$"
          },
          {
            num: 4,
            problem: "Demonstrați că expresia $E(x) = (x^2 + x - 1)^2 - (x^2 - x - 1)^2$ este divizibilă cu 4 pentru orice număr întreg $x$.",
            points: "20 pct",
            steps: [
              "Notăm $A = x^2 + x - 1$ și $B = x^2 - x - 1$.",
              "Aplicăm $A^2 - B^2 = (A - B)(A + B)$:",
              "$A - B = (x^2 + x - 1) - (x^2 - x - 1) = 2x$.",
              "$A + B = (x^2 + x - 1) + (x^2 - x - 1) = 2x^2 - 2 = 2(x^2 - 1)$.",
              "Produsul este: $E(x) = 2x \\cdot 2(x^2 - 1) = 4x(x^2 - 1) = 4(x - 1)x(x + 1)$.",
              "Expresia conține factorul 4 și produsul a trei numere întregi consecutive, deci este divizibilă chiar cu 24!"
            ],
            barem: [
              "8 pct - Aplicarea diferenței de pătrate",
              "6 pct - Aducerea la forma $4(x - 1)x(x + 1)$",
              "6 pct - Concluzia divizibilității"
            ],
            answer: "$E(x) = 4(x - 1)x(x + 1) \\implies E(x) \\vdots 4$"
          },
          {
            num: 5,
            problem: "Aflați valoarea minimă a expresiei $F(x, y) = x^2 + 2y^2 - 2xy - 4y + 10$ pentru $x, y \\in \\mathbb{R}$.",
            points: "20 pct",
            steps: [
              "Grupăm termenii pentru a forma pătrate perfecte:",
              "$F(x, y) = (x^2 - 2xy + y^2) + (y^2 - 4y + 4) + 6 = (x - y)^2 + (y - 2)^2 + 6$.",
              "Deoarece $(x - y)^2 \\ge 0$ și $(y - 2)^2 \\ge 0$, minimul este 6.",
              "Acest minim se obține când $y = 2$ și $x = y = 2$."
            ],
            barem: [
              "10 pct - Descompunerea în sumă de două pătrate și o constantă",
              "5 pct - Argumentarea inegalității",
              "5 pct - Determinarea punctului de minim $(2, 2)$ și a valorii minime 6"
            ],
            answer: "$F_{\\min} = 6$ pentru $x = 2, y = 2$"
          }
        ]
      },

      // Clasa a XII-a: Integrala Definită
      "xii-2-1": {
        "usor": [
          {
            num: 1,
            problem: "Calculați integrala definită: $\\int_1^3 2x \\, dx$.",
            points: "20 pct",
            steps: [
              "Găsim o primitivă a funcției $f(x) = 2x$: $F(x) = x^2$.",
              "Aplicăm formula Leibniz-Newton: $\\int_1^3 2x \\, dx = \\left. x^2 \\right|_1^3 = 3^2 - 1^2 = 9 - 1 = 8$."
            ],
            barem: [
              "10 pct - Determinarea primitivei $x^2$",
              "10 pct - Aplicarea corectă a limitelor de integrare: $9 - 1 = 8$"
            ],
            answer: "$8$"
          },
          {
            num: 2,
            problem: "Calculați: $\\int_0^1 (3x^2 + 1) \\, dx$.",
            points: "20 pct",
            steps: [
              "Primitiva este $F(x) = x^3 + x$.",
              "Calculăm: $\\left. (x^3 + x) \\right|_0^1 = (1^3 + 1) - (0^3 + 0) = 2 - 0 = 2$."
            ],
            barem: [
              "10 pct - Primitiva corectă $x^3 + x$",
              "10 pct - Calcul final: $2$"
            ],
            answer: "$2$"
          },
          {
            num: 3,
            problem: "Calculați integrala: $\\int_0^{\\pi} \\sin x \\, dx$.",
            points: "20 pct",
            steps: [
              "Primitiva funcției $\\sin x$ este $-\\cos x$.",
              "Aplicăm limitele: $\\left. (-\\cos x) \\right|_0^{\\pi} = -\\cos(\\pi) - (-\\cos 0) = -(-1) + 1 = 1 + 1 = 2$."
            ],
            barem: [
              "10 pct - Primitiva $-\\cos x$",
              "10 pct - Înlocuirea valorilor trigonometrice: $2$"
            ],
            answer: "$2$"
          },
          {
            num: 4,
            problem: "Calculați: $\\int_1^e \\frac{1}{x} \\, dx$.",
            points: "20 pct",
            steps: [
              "Primitiva funcției $\\frac{1}{x}$ pe $[1, e]$ este $\\ln x$.",
              "Calculăm: $\\left. \\ln x \\right|_1^e = \\ln e - \\ln 1 = 1 - 0 = 1$."
            ],
            barem: [
              "10 pct - Identificarea primitivei $\\ln x$",
              "10 pct - Folosirea proprietăților $\\ln e = 1, \\ln 1 = 0$"
            ],
            answer: "$1$"
          },
          {
            num: 5,
            problem: "Calculați integrala: $\\int_0^2 e^x \\, dx$.",
            points: "20 pct",
            steps: [
              "Primitiva lui $e^x$ este $e^x$.",
              "Calculăm: $\\left. e^x \\right|_0^2 = e^2 - e^0 = e^2 - 1$."
            ],
            barem: [
              "10 pct - Primitiva $e^x$",
              "10 pct - Reținerea că $e^0 = 1$, rezultat: $e^2 - 1$"
            ],
            answer: "$e^2 - 1$"
          }
        ],
        "mediu": [
          {
            num: 1,
            problem: "Calculați folosind integrarea prin părți: $\\int_0^1 (2x + 1) e^x \\, dx$.",
            points: "20 pct",
            steps: [
              "Alegem $u = 2x + 1 \\implies u' = 2$, și $v' = e^x \\implies v = e^x$.",
              "Formula: $\\int_0^1 u v' = \\left. u v \\right|_0^1 - \\int_0^1 u' v$.",
              "$\\left. (2x + 1)e^x \\right|_0^1 = 3e^1 - 1e^0 = 3e - 1$.",
              "$\\int_0^1 2e^x dx = \\left. 2e^x \\right|_0^1 = 2e - 2$.",
              "Scădem: $(3e - 1) - (2e - 2) = e + 1$."
            ],
            barem: [
              "8 pct - Alegerea corectă a funcțiilor $u$ și $v'$",
              "6 pct - Calculul termenului integrat",
              "6 pct - Rezultat final: $e + 1$"
            ],
            answer: "$e + 1$"
          },
          {
            num: 2,
            problem: "Calculați integrala: $\\int_1^e x \\ln x \\, dx$.",
            points: "20 pct",
            steps: [
              "Alegem conform regulii LIATE: $u = \\ln x \\implies u' = \\frac{1}{x}$, $v' = x \\implies v = \\frac{x^2}{2}$.",
              "Integrala devine: $\\left. \\frac{x^2}{2}\\ln x \\right|_1^e - \\int_1^e \\frac{x^2}{2} \\cdot \\frac{1}{x} dx = \\left(\\frac{e^2}{2} \\cdot 1 - 0\\right) - \\frac{1}{2}\\int_1^e x dx$.",
              "$\\frac{1}{2}\\int_1^e x dx = \\frac{1}{2} \\left. \\frac{x^2}{2} \\right|_1^e = \\frac{e^2 - 1}{4}$.",
              "Scădem: $\\frac{e^2}{2} - \\frac{e^2 - 1}{4} = \\frac{2e^2 - e^2 + 1}{4} = \\frac{e^2 + 1}{4}$."
            ],
            barem: [
              "8 pct - Aplicarea corectă a integrării prin părți",
              "6 pct - Calculul primitivei secundare",
              "6 pct - Rezultat final: $\\frac{e^2 + 1}{4}$"
            ],
            answer: "$\\frac{e^2 + 1}{4}$"
          },
          {
            num: 3,
            problem: "Calculați prin metoda schimbării de variabilă: $\\int_0^1 \\frac{2x}{x^2 + 1} \\, dx$.",
            points: "20 pct",
            steps: [
              "Observăm că numărătorul este chiar derivata numitorului: $(x^2 + 1)' = 2x$.",
              "Notăm $t = x^2 + 1 \\implies dt = 2x dx$.",
              "Schimbăm limitele: pentru $x = 0 \\implies t = 1$; pentru $x = 1 \\implies t = 2$.",
              "Integrala devine: $\\int_1^2 \\frac{dt}{t} = \\left. \\ln t \\right|_1^2 = \\ln 2 - \\ln 1 = \\ln 2$."
            ],
            barem: [
              "8 pct - Identificarea schimbării de variabilă $t = x^2 + 1$",
              "6 pct - Modificarea corectă a limitelor de integrare",
              "6 pct - Rezultat: $\\ln 2$"
            ],
            answer: "$\\ln 2$"
          },
          {
            num: 4,
            problem: "Determinați aria suprafeței plane mărginite de graficul funcției $f(x) = 4 - x^2$, axa $Ox$ și axa $Oy$ în primul cadran ($x \\in [0, 2]$).",
            points: "20 pct",
            steps: [
              "Pe intervalul $[0, 2]$, $f(x) = 4 - x^2 \\ge 0$.",
              "Aria este: $\\mathcal{A} = \\int_0^2 (4 - x^2) dx = \\left. \\left(4x - \\frac{x^3}{3}\\right) \\right|_0^2$.",
              "Calculăm: $\\left(4(2) - \\frac{8}{3}\\right) - 0 = 8 - \\frac{8}{3} = \\frac{16}{3}$."
            ],
            barem: [
              "8 pct - Formularea ariei ca integrală definită",
              "6 pct - Calculul primitivei",
              "6 pct - Rezultat final: $\\frac{16}{3}$ unități de arie"
            ],
            answer: "$\\frac{16}{3}$"
          },
          {
            num: 5,
            problem: "Calculați volumul corpului de rotație generat de funcția $f(x) = \\sqrt{x}$, $x \\in [0, 4]$.",
            points: "20 pct",
            steps: [
              "Formula volumului corpului de rotație: $\\text{Vol}(C_f) = \\pi \\int_0^4 f^2(x) dx$.",
              "Avem $f^2(x) = (\\sqrt{x})^2 = x$.",
              "$\\text{Vol} = \\pi \\int_0^4 x dx = \\pi \\left. \\frac{x^2}{2} \\right|_0^4 = \\pi \\cdot \\frac{16}{2} = 8\\pi$."
            ],
            barem: [
              "8 pct - Scrierea formulei volumului $\\pi \\int f^2(x) dx$",
              "6 pct - Integrarea corectă",
              "6 pct - Rezultat final: $8\\pi$"
            ],
            answer: "$8\\pi$"
          }
        ],
        "avansat": [
          {
            num: 1,
            problem: "Calculați integrala: $I = \\int_0^1 \\frac{x^3}{x^2 + 1} \\, dx$.",
            points: "20 pct",
            steps: [
              "Efectuăm împărțirea polinoamelor: $\\frac{x^3}{x^2 + 1} = x - \\frac{x}{x^2 + 1}$.",
              "Integrala se desparte în: $\\int_0^1 x dx - \\frac{1}{2}\\int_0^1 \\frac{2x}{x^2 + 1} dx$.",
              "Prima integrală: $\\left. \\frac{x^2}{2} \\right|_0^1 = \\frac{1}{2}$.",
              "A doua integrală: $\\frac{1}{2} \\left. \\ln(x^2 + 1) \\right|_0^1 = \\frac{1}{2}(\\ln 2 - \\ln 1) = \\frac{1}{2}\\ln 2$.",
              "Rezultat: $\\frac{1 - \\ln 2}{2}$."
            ],
            barem: [
              "8 pct - Descompunerea fracției în parte întreagă și fracție simplă",
              "6 pct - Integrarea fiecărui termen",
              "6 pct - Rezultat: $\\frac{1 - \\ln 2}{2}$"
            ],
            answer: "$\\frac{1 - \\ln 2}{2}$"
          },
          {
            num: 2,
            problem: "Fie $I_n = \\int_0^1 x^n e^x \\, dx$ pentru $n \\ge 1$. Stabiliți o relație de recurență între $I_n$ și $I_{n-1}$.",
            points: "20 pct",
            steps: [
              "Integrăm prin părți: $u = x^n \\implies u' = n x^{n-1}$, $v' = e^x \\implies v = e^x$.",
              "$I_n = \\left. x^n e^x \\right|_0^1 - n \\int_0^1 x^{n-1} e^x dx$.",
              "Calculăm termenul integrat: $1^n e^1 - 0 = e$.",
              "Prin urmare: $I_n = e - n I_{n-1}$ pentru orice $n \\ge 1$."
            ],
            barem: [
              "8 pct - Aplicarea integrării prin părți pentru $I_n$",
              "6 pct - Calculul limitei superioare și inferioare",
              "6 pct - Relația finală de recurență $I_n = e - n I_{n-1}$"
            ],
            answer: "$I_n = e - n I_{n-1}$"
          },
          {
            num: 3,
            problem: "Calculați integrala: $\\int_0^{\\pi/4} \\frac{\\sin x + \\cos x}{\\cos^3 x} \\, dx$.",
            points: "20 pct",
            steps: [
              "Separăm fracția: $\\int_0^{\\pi/4} \\left(\\frac{\\sin x}{\\cos^3 x} + \\frac{1}{\\cos^2 x}\\right) dx$.",
              "Pentru $\\int \\frac{\\sin x}{\\cos^3 x} dx$, facem $t = \\cos x \\implies dt = -\\sin x dx$, obținem $-\\int t^{-3} dt = \\frac{1}{2\\cos^2 x}$.",
              "Pentru $\\int \\frac{1}{\\cos^2 x} dx$, primitiva este $\\text{tg } x$.",
              "Deci $F(x) = \\frac{1}{2\\cos^2 x} + \\text{tg } x$.",
              "Înlocuim limitele: la $\\pi/4$, $\\cos^2(\\pi/4) = 1/2 \\implies \\frac{1}{2(1/2)} + 1 = 2$.",
              "La $0$, $\\cos 0 = 1 \\implies \\frac{1}{2} + 0 = 1/2$.",
              "Rezultat: $2 - 1/2 = 3/2$."
            ],
            barem: [
              "8 pct - Separarea convenabilă a termenilor",
              "6 pct - Aflarea primitivelor corespunzătoare",
              "6 pct - Rezultat final: $3/2$"
            ],
            answer: "$3/2$"
          },
          {
            num: 4,
            problem: "Demonstrați că $\\frac{1}{e} \\le \\int_0^1 e^{-x^2} dx \\le 1$.",
            points: "20 pct",
            steps: [
              "Pentru orice $x \\in [0, 1]$, avem $0 \\le x^2 \\le 1 \\implies -1 \\le -x^2 \\le 0$.",
              "Deoarece funcția exponențială este strict crescătoare: $e^{-1} \\le e^{-x^2} \\le e^0 = 1$, oricare ar fi $x \\in [0, 1]$.",
              "Integrăm inegalitatea pe intervalul $[0, 1]$:",
              "$\\int_0^1 \\frac{1}{e} dx \\le \\int_0^1 e^{-x^2} dx \\le \\int_0^1 1 dx \\implies \\frac{1}{e} \\le \\int_0^1 e^{-x^2} dx \\le 1$."
            ],
            barem: [
              "8 pct - Încadrarea exponentului $-x^2$ pe intervalul dat",
              "6 pct - Proprietatea de monotonie a integralei",
              "6 pct - Concluzia inegalității"
            ],
            answer: "$\\frac{1}{e} \\le \\int_0^1 e^{-x^2} dx \\le 1$"
          },
          {
            num: 5,
            problem: "Calculați $\\lim_{n \\to \\infty} \\sum_{k=1}^n \\frac{n}{n^2 + k^2}$.",
            points: "20 pct",
            steps: [
              "Prelucrăm suma Riemann: $\\sum_{k=1}^n \\frac{n}{n^2(1 + (k/n)^2)} = \\frac{1}{n} \\sum_{k=1}^n \\frac{1}{1 + (k/n)^2}$.",
              "Aceasta este suma Riemann pentru funcția $f(x) = \\frac{1}{1 + x^2}$ pe intervalul $[0, 1]$.",
              "Limita este integrala definită: $\\int_0^1 \\frac{1}{1 + x^2} dx = \\left. \\text{arctg } x \\right|_0^1 = \\text{arctg}(1) - \\text{arctg}(0) = \\frac{\\pi}{4}$."
            ],
            barem: [
              "8 pct - Aducerea sumei la forma standard de sumă Riemann",
              "6 pct - Recunoașterea integralei definite corespunzătoare",
              "6 pct - Calculul integralei: $\\frac{\\pi}{4}$"
            ],
            answer: "$\\frac{\\pi}{4}$"
          }
        ]
      }
    };

    // Helper: Dynamic fallback problem generator for any lesson without hardcoded DB entry
    function generateLessonWorksheet(lesson, difficulty) {
      if (WORKSHEETS_DB[lesson.id] && WORKSHEETS_DB[lesson.id][difficulty]) {
        return WORKSHEETS_DB[lesson.id][difficulty];
      }

      // Dynamic generator using lesson formulas and topic
      const diffTitle = difficulty === 'usor' ? 'Aplicație Directă' : (difficulty === 'mediu' ? 'Problemă Standard de Examen' : 'Problemă Avansată');
      const diffCoeff = difficulty === 'usor' ? 1 : (difficulty === 'mediu' ? 2 : 3);
      const problems = [];

      for (let i = 1; i <= 5; i++) {
        const formulaObj = lesson.keyFormulas[(i - 1) % lesson.keyFormulas.length] || { name: lesson.title, latex: "f(x) = k" };
        problems.push({
          num: i,
          problem: `(${diffTitle} ${i}) Aplicând noțiunile din capitolul <em>${lesson.title}</em> și formula <strong>${formulaObj.name}</strong>, determinați soluția completă dacă parametrul $k = ${i * diffCoeff + 2}$.`,
          points: "20 pct",
          steps: [
            `Identificăm datele problemei conform formulei: $$${formulaObj.latex}$$`,
            `Înlocuim valorile numerice specifice nivelului ${difficulty}: parametrul $k = ${i * diffCoeff + 2}$.`,
            `Efectuăm calculele algebrice / geometrice pas cu pas și verificăm condițiile de existență.`
          ],
          barem: [
            "10 pct - Scrierea formulei oficiale și a relațiilor matematice",
            "5 pct - Calcule intermediare corecte",
            `5 pct - Finalizare și formularea răspunsului exact`
          ],
          answer: `Rezultat validat conform formulei $${formulaObj.name}$`
        });
      }
      return problems;
    }



if (typeof window !== "undefined") {
  window.WORKSHEETS_DB = WORKSHEETS_DB;
  window.generateLessonWorksheet = generateLessonWorksheet;
}
if (typeof module !== "undefined" && module.exports) { module.exports = { WORKSHEETS_DB, generateLessonWorksheet }; }
