// -------------------------------------------
//                CLASSE STARTUP
// -------------------------------------------
var Startup = /** @class */ (function () {
    function Startup(_nome, _settoreDiFocus, _descrizione) {
        this.prodottiOfferti = [];
        this.serviziOfferti = [];
        this.attivitàOfferte = [];
        this.incentiviRicevuti = [];
        this.nome = _nome;
        this.settoreDiFocus = _settoreDiFocus !== null && _settoreDiFocus !== void 0 ? _settoreDiFocus : "";
        this.descrizione = _descrizione !== null && _descrizione !== void 0 ? _descrizione : "";
    }
    Object.defineProperty(Startup.prototype, "getNome", {
        get: function () {
            return this.nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Startup.prototype, "getSettoreDiFocus", {
        get: function () {
            return this.settoreDiFocus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Startup.prototype, "getDescrizione", {
        get: function () {
            return this.descrizione;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Startup.prototype, "getAttivit\u00E0Offerte", {
        get: function () {
            return this.attivitàOfferte;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Startup.prototype, "setNome", {
        set: function (nuovoNome) {
            this.nome = nuovoNome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Startup.prototype, "setSettoreDiFocus", {
        set: function (nuovoSettore) {
            this.settoreDiFocus = nuovoSettore;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Startup.prototype, "setDescrizione", {
        set: function (nuovaDescrizione) {
            this.descrizione = nuovaDescrizione;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Startup.prototype, "setAttivit\u00E0Offerte", {
        set: function (nuovaLista) {
            this.attivitàOfferte = nuovaLista;
        },
        enumerable: false,
        configurable: true
    });
    Startup.prototype.riceviIncentivo = function (incentivo) {
        this.incentiviRicevuti.push(incentivo);
    };
    Startup.prototype.inserisciProdotti = function () {
        var _a;
        var prodotti = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            prodotti[_i] = arguments[_i];
        }
        (_a = this.prodottiOfferti).push.apply(_a, prodotti);
    };
    Startup.prototype.inserisciServizi = function () {
        var _a;
        var servizi = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            servizi[_i] = arguments[_i];
        }
        (_a = this.serviziOfferti).push.apply(_a, servizi);
    };
    Startup.prototype.inserisciAttività = function () {
        var _a;
        var attività = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            attività[_i] = arguments[_i];
        }
        (_a = this.attivitàOfferte).push.apply(_a, attività);
    };
    Startup.prototype.rimuoviIncentivo = function (incentivo) {
        var index = null;
        for (var i = 0; i < this.incentiviRicevuti.length; i++) {
            if (this.incentiviRicevuti[i] === incentivo) {
                index = i;
                break;
            }
        }
        if (index === null) {
            console.log("\u274C L\u2019incentivo con codice ".concat(incentivo.codiceIdentificativo, " non \u00E8 presente in ").concat(this.nome, "."));
            return;
        }
        this.incentiviRicevuti.splice(index, 1);
        // ❗ RIMOZIONE BIDIREZIONALE
        for (var i = 0; i < incentivo.assegnatoAStartup.length; i++) {
            if (incentivo.assegnatoAStartup[i] === this) {
                incentivo.assegnatoAStartup.splice(i, 1);
                break;
            }
        }
        console.log("\uD83D\uDDD1 Incentivo ".concat(incentivo.codiceIdentificativo, " rimosso da ").concat(this.nome, "."));
    };
    Startup.prototype.rimuoviProdotto = function (prodotto) {
        var index = this.prodottiOfferti.indexOf(prodotto);
        if (index === -1) {
            console.log("\u274C Il prodotto \"".concat(prodotto, "\" non esiste nella lista."));
            return;
        }
        this.prodottiOfferti.splice(index, 1);
        console.log("\uD83D\uDDD1 Prodotto \"".concat(prodotto, "\" rimosso da ").concat(this.nome, "."));
    };
    Startup.prototype.rimuoviServizio = function (servizio) {
        var index = this.serviziOfferti.indexOf(servizio);
        if (index === -1) {
            console.log("\u274C Il servizio \"".concat(servizio, "\" non esiste nella lista."));
            return;
        }
        this.serviziOfferti.splice(index, 1);
        console.log("\uD83D\uDDD1 Servizio \"".concat(servizio, "\" rimosso da ").concat(this.nome, "."));
    };
    Startup.prototype.rimuoviAttività = function (attività) {
        var index = this.attivitàOfferte.indexOf(attività);
        if (index === -1) {
            console.log("\u274C L\u2019attivit\u00E0 \"".concat(attività, "\" non esiste nella lista."));
            return;
        }
        this.attivitàOfferte.splice(index, 1);
        console.log("\uD83D\uDDD1 Attivit\u00E0 \"".concat(attività, "\" rimossa da ").concat(this.nome, "."));
    };
    Startup.prototype.profilaStartup = function () {
        console.log("\n\uD83C\uDFE2 STARTUP: ".concat(this.nome));
        console.log("Settore di Focus: ".concat(this.settoreDiFocus));
        console.log("Descrizione: ".concat(this.descrizione));
        console.log("\n\uD83D\uDCE6 Prodotti Offerti:");
        if (this.prodottiOfferti.length === 0)
            console.log("- Nessun prodotto");
        else {
            for (var i = 0; i < this.prodottiOfferti.length; i++) {
                console.log("- ".concat(this.prodottiOfferti[i]));
            }
        }
        console.log("\n\uD83D\uDECE Servizi Offerti:");
        if (this.serviziOfferti.length === 0)
            console.log("- Nessun servizio");
        else {
            for (var i = 0; i < this.serviziOfferti.length; i++) {
                console.log("- ".concat(this.serviziOfferti[i]));
            }
        }
        console.log("\n\uD83C\uDFAF Attivit\u00E0 Offerte:");
        if (this.attivitàOfferte.length === 0)
            console.log("- Nessuna attività");
        else {
            for (var i = 0; i < this.attivitàOfferte.length; i++) {
                console.log("- ".concat(this.attivitàOfferte[i]));
            }
        }
        console.log("\n\uD83C\uDF81 Incentivi ricevuti:");
        if (this.incentiviRicevuti.length === 0)
            console.log("- Nessun incentivo ricevuto");
        else {
            for (var i = 0; i < this.incentiviRicevuti.length; i++) {
                console.log("- Codice ".concat(this.incentiviRicevuti[i].codiceIdentificativo, ", valore: ").concat(this.incentiviRicevuti[i].valoreIncentivo));
            }
        }
        console.log("\n--------------------------------------------");
    };
    return Startup;
}());
// -------------------------------------------
//                CLASSE INCENTIVO
// -------------------------------------------
var Incentivo = /** @class */ (function () {
    function Incentivo(_codiceIdentificativo, _descrizione, _valoreIncentivo) {
        var _criteriEleggibilità = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            _criteriEleggibilità[_i - 3] = arguments[_i];
        }
        this.criteriEleggibilità = [];
        this.assegnatoAStartup = [];
        this.codiceIdentificativo = _codiceIdentificativo;
        this.descrizione = _descrizione !== null && _descrizione !== void 0 ? _descrizione : "";
        this.valoreIncentivo = _valoreIncentivo !== null && _valoreIncentivo !== void 0 ? _valoreIncentivo : 0;
        this.criteriEleggibilità =
            (_criteriEleggibilità === null || _criteriEleggibilità === void 0 ? void 0 : _criteriEleggibilità.length) > 0 ? _criteriEleggibilità : [];
    }
    Object.defineProperty(Incentivo.prototype, "getDescrizione", {
        get: function () {
            return this.descrizione;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Incentivo.prototype, "getValoreIncentivo", {
        get: function () {
            return this.valoreIncentivo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Incentivo.prototype, "getCriteriEleggibilit\u00E0", {
        get: function () {
            return this.criteriEleggibilità;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Incentivo.prototype, "setDescrizione", {
        set: function (nuovaDescrizione) {
            this.descrizione = nuovaDescrizione;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Incentivo.prototype, "setValoreIncentivo", {
        set: function (nuovoValore) {
            this.valoreIncentivo = nuovoValore;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Incentivo.prototype, "setCriteriEleggibilit\u00E0", {
        set: function (nuoviCriteri) {
            this.criteriEleggibilità = nuoviCriteri;
        },
        enumerable: false,
        configurable: true
    });
    Incentivo.prototype.aggiungiCriteri = function () {
        var criteri = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            criteri[_i] = arguments[_i];
        }
        for (var i = 0; i < criteri.length; i++) {
            this.criteriEleggibilità.push(criteri[i]);
        }
    };
    Incentivo.prototype.assegnaAStartup = function (startup) {
        this.assegnatoAStartup.push(startup);
        startup.riceviIncentivo(this);
    };
    Incentivo.prototype.rimuoviCriterio = function (criterio) {
        var index = this.criteriEleggibilità.indexOf(criterio);
        if (index === -1) {
            console.log("\u274C Criterio \"".concat(criterio, "\" non presente."));
            return;
        }
        this.criteriEleggibilità.splice(index, 1);
        console.log("\uD83D\uDDD1 Criterio \"".concat(criterio, "\" rimosso dall\u2019incentivo ").concat(this.codiceIdentificativo, "."));
    };
    Incentivo.prototype.rimuoviStartup = function (startup) {
        var _this = this;
        var index = this.assegnatoAStartup.indexOf(startup);
        if (index === -1) {
            console.log("\u274C Startup \"".concat(startup.nome, "\" non assegnata a questo incentivo."));
            return;
        }
        this.assegnatoAStartup.splice(index, 1);
        // RIMUOVO ANCHE l’incentivo dalla startup
        startup.incentiviRicevuti = startup.incentiviRicevuti.filter(function (i) { return i !== _this; });
        console.log("\uD83D\uDDD1 Startup \"".concat(startup.nome, "\" rimossa dall\u2019incentivo ").concat(this.codiceIdentificativo, "."));
    };
    Incentivo.prototype.profilaIncentivo = function () {
        console.log("\n\uD83C\uDF81 INCENTIVO - Codice: ".concat(this.codiceIdentificativo));
        console.log("Descrizione: ".concat(this.descrizione));
        console.log("Valore: ".concat(this.valoreIncentivo));
        console.log("\n\uD83D\uDCCC Criteri di Eleggibilit\u00E0:");
        if (this.criteriEleggibilità.length === 0)
            console.log("- Nessun criterio");
        else {
            for (var i = 0; i < this.criteriEleggibilità.length; i++) {
                console.log("- ".concat(this.criteriEleggibilità[i]));
            }
        }
        console.log("\n\uD83C\uDFE2 Assegnato alle Startup:");
        if (this.assegnatoAStartup.length === 0)
            console.log("- Nessuna startup assegnata");
        else {
            for (var i = 0; i < this.assegnatoAStartup.length; i++) {
                console.log("- ".concat(this.assegnatoAStartup[i].nome));
            }
        }
        console.log("\n--------------------------------------------");
    };
    return Incentivo;
}());
// -------------------------------------------
//                CLASSE CITTADINO
// -------------------------------------------
var Cittadino = /** @class */ (function () {
    function Cittadino(_nome, _età) {
        var _interessiSportivi = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            _interessiSportivi[_i - 2] = arguments[_i];
        }
        this.usufruitiProdottiDi = [];
        this.usufruitiServiziDi = [];
        this.partecipatoAdAttivitàDi = [];
        this.nome = _nome;
        this.età = _età !== null && _età !== void 0 ? _età : 0;
        this.interessiSportivi =
            _interessiSportivi.length > 0 ? _interessiSportivi : [];
    }
    Object.defineProperty(Cittadino.prototype, "getNome", {
        get: function () {
            return this.nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cittadino.prototype, "getEt\u00E0", {
        get: function () {
            return this.età;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cittadino.prototype, "getInteressiSportivi", {
        get: function () {
            return this.interessiSportivi;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cittadino.prototype, "setNome", {
        set: function (nuovoNome) {
            this.nome = nuovoNome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cittadino.prototype, "setEt\u00E0", {
        set: function (nuovaEtà) {
            this.età = nuovaEtà;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cittadino.prototype, "setInteressiSportivi", {
        set: function (nuoviInteressi) {
            this.interessiSportivi = nuoviInteressi;
        },
        enumerable: false,
        configurable: true
    });
    Cittadino.prototype.aggiungiInteressi = function () {
        var _a;
        var interessi = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            interessi[_i] = arguments[_i];
        }
        (_a = this.interessiSportivi).push.apply(_a, interessi);
    };
    Cittadino.prototype.usufruisciDiProdotto = function (startup, prodotto) {
        var trovato = false;
        for (var i = 0; i < startup.prodottiOfferti.length; i++) {
            if (startup.prodottiOfferti[i] === prodotto) {
                trovato = true;
                break;
            }
        }
        if (!trovato) {
            console.log("\u274C ".concat(startup.nome, " non offre il prodotto: ").concat(prodotto));
            return;
        }
        this.usufruitiProdottiDi.push({ startup: startup, prodotto: prodotto });
        console.log("\uD83C\uDF4F ".concat(this.nome, " usufruisce del prodotto \"").concat(prodotto, "\" presso ").concat(startup.nome, "."));
    };
    Cittadino.prototype.usufruisciDiServizio = function (startup, servizio) {
        var trovato = false;
        for (var i = 0; i < startup.serviziOfferti.length; i++) {
            if (startup.serviziOfferti[i] === servizio) {
                trovato = true;
                break;
            }
        }
        if (!trovato) {
            console.log("\u274C ".concat(startup.nome, " non offre il servizio: ").concat(servizio));
            return;
        }
        this.usufruitiServiziDi.push({ startup: startup, servizio: servizio });
        console.log("\uD83D\uDECE ".concat(this.nome, " usufruisce del servizio \"").concat(servizio, "\" presso ").concat(startup.nome, "."));
    };
    Cittadino.prototype.partecipaAttività = function (startup, attività) {
        var trovato = false;
        for (var i = 0; i < startup.attivitàOfferte.length; i++) {
            if (startup.attivitàOfferte[i] === attività) {
                trovato = true;
                break;
            }
        }
        if (!trovato) {
            console.log("\u274C ".concat(startup.nome, " non offre l\u2019attivit\u00E0: ").concat(attività));
            return;
        }
        this.partecipatoAdAttivitàDi.push({ startup: startup, attività: attività });
        console.log("\uD83C\uDFC3\u200D\u2642\uFE0F ".concat(this.nome, " partecipa a \"").concat(attività, "\" presso ").concat(startup.nome, "."));
    };
    Cittadino.prototype.mostraProdottiUsufruiti = function (startup) {
        var lista = this.usufruitiProdottiDi.filter(function (i) { return i.startup === startup; });
        if (lista.length === 0) {
            console.log("\uD83D\uDEAB Nessun prodotto usufruito presso ".concat(startup.nome, "."));
            return;
        }
        console.log("\uD83D\uDCE6 Prodotti usufruiti da ".concat(this.nome, " presso ").concat(startup.nome, ":"));
        lista.forEach(function (i) { return console.log("- ".concat(i.prodotto)); });
    };
    Cittadino.prototype.mostraServiziUsufruiti = function (startup) {
        var lista = this.usufruitiServiziDi.filter(function (i) { return i.startup === startup; });
        if (lista.length === 0) {
            console.log("\uD83D\uDEAB Nessun servizio usufruito presso ".concat(startup.nome, "."));
            return;
        }
        console.log("\uD83D\uDECE Servizi usufruiti da ".concat(this.nome, " presso ").concat(startup.nome, ":"));
        lista.forEach(function (i) { return console.log("- ".concat(i.servizio)); });
    };
    Cittadino.prototype.mostraAttivitàSvolte = function (startup) {
        var lista = this.partecipatoAdAttivitàDi.filter(function (i) { return i.startup === startup; });
        if (lista.length === 0) {
            console.log("\uD83D\uDEAB Nessuna attivit\u00E0 svolta presso ".concat(startup.nome, "."));
            return;
        }
        console.log("\uD83C\uDFAF Attivit\u00E0 svolte da ".concat(this.nome, " presso ").concat(startup.nome, ":"));
        lista.forEach(function (i) { return console.log("- ".concat(i.attività)); });
    };
    Cittadino.prototype.rimuoviProdottoUsufruito = function (startup, prodotto) {
        var index = null;
        for (var i = 0; i < this.usufruitiProdottiDi.length; i++) {
            if (this.usufruitiProdottiDi[i].startup === startup &&
                this.usufruitiProdottiDi[i].prodotto === prodotto) {
                index = i;
                break;
            }
        }
        if (index === null) {
            console.log("\u274C Nessun utilizzo del prodotto \"".concat(prodotto, "\" presso ").concat(startup.nome, "."));
            return;
        }
        this.usufruitiProdottiDi.splice(index, 1);
        console.log("\uD83D\uDDD1 Prodotto \"".concat(prodotto, "\" rimosso da ").concat(startup.nome, "."));
    };
    Cittadino.prototype.rimuoviServizioUsufruito = function (startup, servizio) {
        var index = null;
        for (var i = 0; i < this.usufruitiServiziDi.length; i++) {
            if (this.usufruitiServiziDi[i].startup === startup &&
                this.usufruitiServiziDi[i].servizio === servizio) {
                index = i;
                break;
            }
        }
        if (index === null) {
            console.log("\u274C Nessun utilizzo del servizio \"".concat(servizio, "\" presso ").concat(startup.nome, "."));
            return;
        }
        this.usufruitiServiziDi.splice(index, 1);
        console.log("\uD83D\uDDD1 Servizio \"".concat(servizio, "\" rimosso da ").concat(startup.nome, "."));
    };
    Cittadino.prototype.rimuoviAttivitàSvolta = function (startup, attività) {
        var index = null;
        for (var i = 0; i < this.partecipatoAdAttivitàDi.length; i++) {
            if (this.partecipatoAdAttivitàDi[i].startup === startup &&
                this.partecipatoAdAttivitàDi[i].attività === attività) {
                index = i;
                break;
            }
        }
        if (index === null) {
            console.log("\u274C Nessuna attivit\u00E0 \"".concat(attività, "\" risulta presso ").concat(startup.nome, "."));
            return;
        }
        this.partecipatoAdAttivitàDi.splice(index, 1);
        console.log("\uD83D\uDDD1 Attivit\u00E0 \"".concat(attività, "\" rimossa da ").concat(startup.nome, "."));
    };
    Cittadino.prototype.profilaCittadino = function () {
        console.log("\n\uD83E\uDDCD CITTADINO: ".concat(this.nome));
        console.log("Et\u00E0: ".concat(this.età));
        console.log("Interessi sportivi: ".concat(this.interessiSportivi.join(", ")));
        console.log("\n\uD83C\uDF4F Prodotti usufruiti:");
        if (this.usufruitiProdottiDi.length === 0)
            console.log("- Nessun prodotto");
        else {
            for (var i = 0; i < this.usufruitiProdottiDi.length; i++) {
                console.log("- ".concat(this.usufruitiProdottiDi[i].prodotto, " presso ").concat(this.usufruitiProdottiDi[i].startup.nome));
            }
        }
        console.log("\n\uD83D\uDECE Servizi usufruiti:");
        if (this.usufruitiServiziDi.length === 0)
            console.log("- Nessun servizio");
        else {
            for (var i = 0; i < this.usufruitiServiziDi.length; i++) {
                console.log("- ".concat(this.usufruitiServiziDi[i].servizio, " presso ").concat(this.usufruitiServiziDi[i].startup.nome));
            }
        }
        console.log("\n\uD83C\uDFAF Attivit\u00E0 svolte:");
        if (this.partecipatoAdAttivitàDi.length === 0)
            console.log("- Nessuna attività");
        else {
            for (var i = 0; i < this.partecipatoAdAttivitàDi.length; i++) {
                console.log("- ".concat(this.partecipatoAdAttivitàDi[i].attività, " presso ").concat(this.partecipatoAdAttivitàDi[i].startup.nome));
            }
        }
        console.log("\n--------------------------------------------");
    };
    return Cittadino;
}());
// -------------------------------------------
//          ISTANZE DI STARTUP
// -------------------------------------------
var fitTrack = new Startup("FitTrack", "Wearable Tech", "Monitoraggio sportivo");
var aquaGym = new Startup("AquaGymPro", "Sport Acquatici", "Attività in piscina");
var runBoost = new Startup("RunBoost", "Corsa & Coaching", "Programmi di corsa personalizzati");
// Aggiunta prodotti, servizi, attività
fitTrack.inserisciProdotti("Smartwatch FT1", "Sensore Sonno");
fitTrack.inserisciServizi("Analisi dati fitness");
fitTrack.inserisciAttività("Lezione Wearable 101");
aquaGym.inserisciProdotti("Braccioli Pro", "Cuffie impermeabili");
aquaGym.inserisciServizi("Corso nuoto intensivo", "Personal trainer acqua");
aquaGym.inserisciAttività("Aqua Zumba");
runBoost.inserisciProdotti("Scarpe RunX", "Calze tecniche");
runBoost.inserisciServizi("Coaching settimanale", "Analisi postura");
runBoost.inserisciAttività("Allenamento collettivo", "Corsa 10km guidata");
// -------------------------------------------
//          ISTANZE DI INCENTIVI
// -------------------------------------------
var incentivo1 = new Incentivo(101, "Bonus Wearables 2025", 150, "ISCRITTO", "MAGGIORENNE");
var incentivo2 = new Incentivo(202, "Bonus Piscina", 200, "RESIDENTE", "SPORT ACQUATICI");
var incentivo3 = new Incentivo(303, "Bonus Running", 180, "ATLETA", "CORSI CORSA");
// Assegnazione incentivi alle startup
incentivo1.assegnaAStartup(fitTrack);
incentivo2.assegnaAStartup(aquaGym);
incentivo3.assegnaAStartup(runBoost);
// Rimozioni di test
incentivo1.aggiungiCriteri("VISITA MEDICA");
incentivo1.rimuoviCriterio("ISCRITTO");
// -------------------------------------------
//          ISTANZE DI CITTADINI
// -------------------------------------------
var marco = new Cittadino("Marco", 28, "Corsa", "Palestra");
var lisa = new Cittadino("Lisa", 34, "Nuoto", "Yoga");
var gianni = new Cittadino("Gianni", 19, "Tecnologia", "Atletica Leggera");
// Aggiunta interessi
marco.aggiungiInteressi("HIIT");
lisa.aggiungiInteressi("Meditazione");
gianni.aggiungiInteressi("Sport Wearable");
// -------------------------------------------
//          UTILIZZO PRODOTTI/SERVIZI/ATTIVITÀ
// -------------------------------------------
// Marco
marco.usufruisciDiProdotto(fitTrack, "Smartwatch FT1");
marco.usufruisciDiServizio(runBoost, "Coaching settimanale");
marco.partecipaAttività(runBoost, "Allenamento collettivo");
// Lisa
lisa.usufruisciDiServizio(aquaGym, "Corso nuoto intensivo");
lisa.partecipaAttività(aquaGym, "Aqua Zumba");
// Gianni
gianni.usufruisciDiProdotto(fitTrack, "Sensore Sonno");
gianni.partecipaAttività(fitTrack, "Lezione Wearable 101");
// -------------------------------------------
//          MOSTRA DATI (lettura)
// -------------------------------------------
marco.mostraProdottiUsufruiti(fitTrack);
marco.mostraServiziUsufruiti(runBoost);
lisa.mostraServiziUsufruiti(aquaGym);
lisa.mostraAttivitàSvolte(aquaGym);
gianni.mostraProdottiUsufruiti(fitTrack);
// -------------------------------------------
//          RIMOZIONI SPECIFICHE
// -------------------------------------------
marco.rimuoviServizioUsufruito(runBoost, "Coaching settimanale");
lisa.rimuoviAttivitàSvolta(aquaGym, "Aqua Zumba");
gianni.rimuoviProdottoUsufruito(fitTrack, "Sensore Sonno");
fitTrack.rimuoviProdotto("Sensore Sonno");
aquaGym.rimuoviServizio("Personal trainer acqua");
runBoost.rimuoviAttività("Corsa 10km guidata");
// Rimozione incentivo bidirezionale
fitTrack.rimuoviIncentivo(incentivo1);
incentivo3.rimuoviStartup(runBoost);
// -------------------------------------------
//          PROFILAZIONE COMPLETA
// -------------------------------------------
fitTrack.profilaStartup();
aquaGym.profilaStartup();
runBoost.profilaStartup();
incentivo1.profilaIncentivo();
incentivo2.profilaIncentivo();
incentivo3.profilaIncentivo();
marco.profilaCittadino();
lisa.profilaCittadino();
gianni.profilaCittadino();
