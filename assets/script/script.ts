interface IIncentivo {
    codiceIdentificativo: number;
    descrizione: string;
    valoreIncentivo: number;

    criteriEleggibilità: string[];
    assegnatoAStartup: IStartup[];

    assegnaAStartup(startup: IStartup): void;
    aggiungiCriteri(...criteri: string[]): void;

    rimuoviCriterio(criterio: string): void;
    rimuoviStartup(startup: IStartup): void;

    profilaIncentivo(): void;
}

interface IStartup {
    nome: string;
    settoreDiFocus: string;
    descrizione: string;

    prodottiOfferti: string[];
    serviziOfferti: string[];
    attivitàOfferte: string[];
    incentiviRicevuti: IIncentivo[];

    riceviIncentivo(incentivo: IIncentivo): void;
    inserisciProdotti(...prodotti: string[]): void;
    inserisciServizi(...servizi: string[]): void;
    inserisciAttività(...attività: string[]): void;

    rimuoviIncentivo(incentivo: IIncentivo): void;
    rimuoviProdotto(prodotto: string): void;
    rimuoviServizio(servizio: string): void;
    rimuoviAttività(attività: string): void;

    profilaStartup(): void;
}

interface ICittadino {
    nome: string;
    età: number;
    interessiSportivi: string[];

    usufruitiProdottiDi: { startup: IStartup; prodotto: string }[];
    usufruitiServiziDi: { startup: IStartup; servizio: string }[];
    partecipatoAdAttivitàDi: { startup: IStartup; attività: string }[];

    aggiungiInteressi(...interessi: string[]): void;

    usufruisciDiProdotto(startup: IStartup, prodotto: string): void;
    usufruisciDiServizio(startup: IStartup, servizio: string): void;
    partecipaAttività(startup: IStartup, attività: string): void;

    rimuoviProdottoUsufruito(startup: IStartup, prodotto: string): void;
    rimuoviServizioUsufruito(startup: IStartup, servizio: string): void;
    rimuoviAttivitàSvolta(startup: IStartup, attività: string): void;

    mostraProdottiUsufruiti(startup: IStartup): void;
    mostraServiziUsufruiti(startup: IStartup): void;
    mostraAttivitàSvolte(startup: IStartup): void;

    profilaCittadino(): void;
}

// -------------------------------------------
//                CLASSE STARTUP
// -------------------------------------------

class Startup implements IStartup {
    constructor(_nome: string, _settoreDiFocus?: string, _descrizione?: string) {
        this.nome = _nome;
        this.settoreDiFocus = _settoreDiFocus ?? "";
        this.descrizione = _descrizione ?? "";
    }

    nome: string;
    settoreDiFocus: string;
    descrizione: string;

    prodottiOfferti: string[] = [];
    serviziOfferti: string[] = [];
    attivitàOfferte: string[] = [];
    incentiviRicevuti: IIncentivo[] = [];

    get getNome(): string {
        return this.nome;
    }

    get getSettoreDiFocus(): string {
        return this.settoreDiFocus;
    }

    get getDescrizione(): string {
        return this.descrizione;
    }

    get getAttivitàOfferte(): string[] {
        return this.attivitàOfferte;
    }

    set setNome(nuovoNome: string) {
        this.nome = nuovoNome;
    }

    set setSettoreDiFocus(nuovoSettore: string) {
        this.settoreDiFocus = nuovoSettore;
    }

    set setDescrizione(nuovaDescrizione: string) {
        this.descrizione = nuovaDescrizione;
    }

    set setAttivitàOfferte(nuovaLista: string[]) {
        this.attivitàOfferte = nuovaLista;
    }

    riceviIncentivo(incentivo: IIncentivo): void {
        this.incentiviRicevuti.push(incentivo);
    }

    inserisciProdotti(...prodotti: string[]): void {
        this.prodottiOfferti.push(...prodotti);
    }

    inserisciServizi(...servizi: string[]): void {
        this.serviziOfferti.push(...servizi);
    }

    inserisciAttività(...attività: string[]): void {
        this.attivitàOfferte.push(...attività);
    }

    rimuoviIncentivo(incentivo: IIncentivo): void {
        let index: number | null = null;

        for (let i = 0; i < this.incentiviRicevuti.length; i++) {
            if (this.incentiviRicevuti[i] === incentivo) {
                index = i;
                break;
            }
        }

        if (index === null) {
            console.log(`❌ L’incentivo con codice ${incentivo.codiceIdentificativo} non è presente in ${this.nome}.`);
            return;
        }

        this.incentiviRicevuti.splice(index, 1);

        // ❗ RIMOZIONE BIDIREZIONALE
        for (let i = 0; i < incentivo.assegnatoAStartup.length; i++) {
            if (incentivo.assegnatoAStartup[i] === this) {
                incentivo.assegnatoAStartup.splice(i, 1);
                break;
            }
        }

        console.log(`🗑 Incentivo ${incentivo.codiceIdentificativo} rimosso da ${this.nome}.`);
    }


    rimuoviProdotto(prodotto: string): void {
        const index = this.prodottiOfferti.indexOf(prodotto);
        if (index === -1) {
            console.log(`❌ Il prodotto "${prodotto}" non esiste nella lista.`);
            return;
        }
        this.prodottiOfferti.splice(index, 1);
        console.log(`🗑 Prodotto "${prodotto}" rimosso da ${this.nome}.`);
    }

    rimuoviServizio(servizio: string): void {
        const index = this.serviziOfferti.indexOf(servizio);
        if (index === -1) {
            console.log(`❌ Il servizio "${servizio}" non esiste nella lista.`);
            return;
        }
        this.serviziOfferti.splice(index, 1);
        console.log(`🗑 Servizio "${servizio}" rimosso da ${this.nome}.`);
    }

    rimuoviAttività(attività: string): void {
        const index = this.attivitàOfferte.indexOf(attività);
        if (index === -1) {
            console.log(`❌ L’attività "${attività}" non esiste nella lista.`);
            return;
        }
        this.attivitàOfferte.splice(index, 1);
        console.log(`🗑 Attività "${attività}" rimossa da ${this.nome}.`);
    }

    profilaStartup(): void {
        console.log(`\n🏢 STARTUP: ${this.nome}`);
        console.log(`Settore di Focus: ${this.settoreDiFocus}`);
        console.log(`Descrizione: ${this.descrizione}`);

        console.log(`\n📦 Prodotti Offerti:`);
        if (this.prodottiOfferti.length === 0) console.log("- Nessun prodotto");
        else {
            for (let i = 0; i < this.prodottiOfferti.length; i++) {
                console.log(`- ${this.prodottiOfferti[i]}`);
            }
        }

        console.log(`\n🛎 Servizi Offerti:`);
        if (this.serviziOfferti.length === 0) console.log("- Nessun servizio");
        else {
            for (let i = 0; i < this.serviziOfferti.length; i++) {
                console.log(`- ${this.serviziOfferti[i]}`);
            }
        }

        console.log(`\n🎯 Attività Offerte:`);
        if (this.attivitàOfferte.length === 0) console.log("- Nessuna attività");
        else {
            for (let i = 0; i < this.attivitàOfferte.length; i++) {
                console.log(`- ${this.attivitàOfferte[i]}`);
            }
        }

        console.log(`\n🎁 Incentivi ricevuti:`);
        if (this.incentiviRicevuti.length === 0) console.log("- Nessun incentivo ricevuto");
        else {
            for (let i = 0; i < this.incentiviRicevuti.length; i++) {
                console.log(
                    `- Codice ${this.incentiviRicevuti[i].codiceIdentificativo}, valore: ${this.incentiviRicevuti[i].valoreIncentivo}`
                );
            }
        }

        console.log("\n--------------------------------------------");
    }
}

// -------------------------------------------
//                CLASSE INCENTIVO
// -------------------------------------------

class Incentivo implements IIncentivo {
    constructor(
        _codiceIdentificativo: number,
        _descrizione?: string,
        _valoreIncentivo?: number,
        ..._criteriEleggibilità: string[]
    ) {
        this.codiceIdentificativo = _codiceIdentificativo;
        this.descrizione = _descrizione ?? "";
        this.valoreIncentivo = _valoreIncentivo ?? 0;
        this.criteriEleggibilità =
            _criteriEleggibilità?.length > 0 ? _criteriEleggibilità : [];
    }

    codiceIdentificativo: number;
    descrizione: string;
    valoreIncentivo: number;
    criteriEleggibilità: string[] = [];

    assegnatoAStartup: IStartup[] = [];

    get getDescrizione(): string {
        return this.descrizione;
    }

    get getValoreIncentivo(): number {
        return this.valoreIncentivo;
    }

    get getCriteriEleggibilità(): string[] {
        return this.criteriEleggibilità;
    }

    set setDescrizione(nuovaDescrizione: string) {
        this.descrizione = nuovaDescrizione;
    }

    set setValoreIncentivo(nuovoValore: number) {
        this.valoreIncentivo = nuovoValore;
    }

    set setCriteriEleggibilità(nuoviCriteri: string[]) {
        this.criteriEleggibilità = nuoviCriteri;
    }

    aggiungiCriteri(...criteri: string[]): void {
        for (let i = 0; i < criteri.length; i++) {
            this.criteriEleggibilità.push(criteri[i]);
        }
    }

    assegnaAStartup(startup: IStartup): void {
        this.assegnatoAStartup.push(startup);
        startup.riceviIncentivo(this);
    }

    rimuoviCriterio(criterio: string): void {
        const index = this.criteriEleggibilità.indexOf(criterio);
        if (index === -1) {
            console.log(`❌ Criterio "${criterio}" non presente.`);
            return;
        }
        this.criteriEleggibilità.splice(index, 1);
        console.log(
            `🗑 Criterio "${criterio}" rimosso dall’incentivo ${this.codiceIdentificativo}.`
        );
    }

    rimuoviStartup(startup: IStartup): void {
        const index = this.assegnatoAStartup.indexOf(startup);
        if (index === -1) {
            console.log(
                `❌ Startup "${startup.nome}" non assegnata a questo incentivo.`
            );
            return;
        }
        this.assegnatoAStartup.splice(index, 1);

        // RIMUOVO ANCHE l’incentivo dalla startup
        startup.incentiviRicevuti = startup.incentiviRicevuti.filter(
            (i) => i !== this
        );

        console.log(
            `🗑 Startup "${startup.nome}" rimossa dall’incentivo ${this.codiceIdentificativo}.`
        );
    }

    profilaIncentivo(): void {
        console.log(`\n🎁 INCENTIVO - Codice: ${this.codiceIdentificativo}`);
        console.log(`Descrizione: ${this.descrizione}`);
        console.log(`Valore: ${this.valoreIncentivo}`);

        console.log(`\n📌 Criteri di Eleggibilità:`);
        if (this.criteriEleggibilità.length === 0) console.log("- Nessun criterio");
        else {
            for (let i = 0; i < this.criteriEleggibilità.length; i++) {
                console.log(`- ${this.criteriEleggibilità[i]}`);
            }
        }

        console.log(`\n🏢 Assegnato alle Startup:`);
        if (this.assegnatoAStartup.length === 0) console.log("- Nessuna startup assegnata");
        else {
            for (let i = 0; i < this.assegnatoAStartup.length; i++) {
                console.log(`- ${this.assegnatoAStartup[i].nome}`);
            }
        }

        console.log("\n--------------------------------------------");
    }
}

// -------------------------------------------
//                CLASSE CITTADINO
// -------------------------------------------

class Cittadino implements ICittadino {
    constructor(_nome: string, _età?: number, ..._interessiSportivi: string[]) {
        this.nome = _nome;
        this.età = _età ?? 0;
        this.interessiSportivi =
            _interessiSportivi.length > 0 ? _interessiSportivi : [];
    }

    nome: string;
    età: number;
    interessiSportivi: string[];

    usufruitiProdottiDi: { startup: IStartup; prodotto: string }[] = [];
    usufruitiServiziDi: { startup: IStartup; servizio: string }[] = [];
    partecipatoAdAttivitàDi: { startup: IStartup; attività: string }[] = [];

    get getNome(): string {
        return this.nome;
    }

    get getEtà(): number {
        return this.età;
    }

    get getInteressiSportivi(): string[] {
        return this.interessiSportivi;
    }

    set setNome(nuovoNome: string) {
        this.nome = nuovoNome;
    }

    set setEtà(nuovaEtà: number) {
        this.età = nuovaEtà;
    }

    set setInteressiSportivi(nuoviInteressi: string[]) {
        this.interessiSportivi = nuoviInteressi;
    }

    aggiungiInteressi(...interessi: string[]): void {
        this.interessiSportivi.push(...interessi);
    }

    usufruisciDiProdotto(startup: IStartup, prodotto: string): void {
        let trovato = false;
        for (let i = 0; i < startup.prodottiOfferti.length; i++) {
            if (startup.prodottiOfferti[i] === prodotto) {
                trovato = true;
                break;
            }
        }

        if (!trovato) {
            console.log(`❌ ${startup.nome} non offre il prodotto: ${prodotto}`);
            return;
        }

        this.usufruitiProdottiDi.push({ startup, prodotto });
        console.log(
            `🍏 ${this.nome} usufruisce del prodotto "${prodotto}" presso ${startup.nome}.`
        );
    }

    usufruisciDiServizio(startup: IStartup, servizio: string): void {
        let trovato = false;
        for (let i = 0; i < startup.serviziOfferti.length; i++) {
            if (startup.serviziOfferti[i] === servizio) {
                trovato = true;
                break;
            }
        }

        if (!trovato) {
            console.log(`❌ ${startup.nome} non offre il servizio: ${servizio}`);
            return;
        }

        this.usufruitiServiziDi.push({ startup, servizio });
        console.log(
            `🛎 ${this.nome} usufruisce del servizio "${servizio}" presso ${startup.nome}.`
        );
    }

    partecipaAttività(startup: IStartup, attività: string): void {
        let trovato = false;
        for (let i = 0; i < startup.attivitàOfferte.length; i++) {
            if (startup.attivitàOfferte[i] === attività) {
                trovato = true;
                break;
            }
        }

        if (!trovato) {
            console.log(`❌ ${startup.nome} non offre l’attività: ${attività}`);
            return;
        }

        this.partecipatoAdAttivitàDi.push({ startup, attività });
        console.log(
            `🏃‍♂️ ${this.nome} partecipa a "${attività}" presso ${startup.nome}.`
        );
    }

    mostraProdottiUsufruiti(startup: IStartup): void {
        const lista = this.usufruitiProdottiDi.filter((i) => i.startup === startup);

        if (lista.length === 0) {
            console.log(`🚫 Nessun prodotto usufruito presso ${startup.nome}.`);
            return;
        }

        console.log(`📦 Prodotti usufruiti da ${this.nome} presso ${startup.nome}:`);
        lista.forEach((i) => console.log(`- ${i.prodotto}`));
    }

    mostraServiziUsufruiti(startup: IStartup): void {
        const lista = this.usufruitiServiziDi.filter((i) => i.startup === startup);

        if (lista.length === 0) {
            console.log(`🚫 Nessun servizio usufruito presso ${startup.nome}.`);
            return;
        }

        console.log(`🛎 Servizi usufruiti da ${this.nome} presso ${startup.nome}:`);
        lista.forEach((i) => console.log(`- ${i.servizio}`));
    }

    mostraAttivitàSvolte(startup: IStartup): void {
        const lista = this.partecipatoAdAttivitàDi.filter(
            (i) => i.startup === startup
        );

        if (lista.length === 0) {
            console.log(`🚫 Nessuna attività svolta presso ${startup.nome}.`);
            return;
        }

        console.log(`🎯 Attività svolte da ${this.nome} presso ${startup.nome}:`);
        lista.forEach((i) => console.log(`- ${i.attività}`));
    }

    rimuoviProdottoUsufruito(startup: IStartup, prodotto: string): void {
        let index: number | null = null;

        for (let i = 0; i < this.usufruitiProdottiDi.length; i++) {
            if (
                this.usufruitiProdottiDi[i].startup === startup &&
                this.usufruitiProdottiDi[i].prodotto === prodotto
            ) {
                index = i;
                break;
            }
        }

        if (index === null) {
            console.log(
                `❌ Nessun utilizzo del prodotto "${prodotto}" presso ${startup.nome}.`
            );
            return;
        }

        this.usufruitiProdottiDi.splice(index, 1);
        console.log(
            `🗑 Prodotto "${prodotto}" rimosso da ${startup.nome}.`
        );
    }

    rimuoviServizioUsufruito(startup: IStartup, servizio: string): void {
        let index: number | null = null;

        for (let i = 0; i < this.usufruitiServiziDi.length; i++) {
            if (
                this.usufruitiServiziDi[i].startup === startup &&
                this.usufruitiServiziDi[i].servizio === servizio
            ) {
                index = i;
                break;
            }
        }

        if (index === null) {
            console.log(
                `❌ Nessun utilizzo del servizio "${servizio}" presso ${startup.nome}.`
            );
            return;
        }

        this.usufruitiServiziDi.splice(index, 1);
        console.log(
            `🗑 Servizio "${servizio}" rimosso da ${startup.nome}.`
        );
    }

    rimuoviAttivitàSvolta(startup: IStartup, attività: string): void {
        let index: number | null = null;

        for (let i = 0; i < this.partecipatoAdAttivitàDi.length; i++) {
            if (
                this.partecipatoAdAttivitàDi[i].startup === startup &&
                this.partecipatoAdAttivitàDi[i].attività === attività
            ) {
                index = i;
                break;
            }
        }

        if (index === null) {
            console.log(
                `❌ Nessuna attività "${attività}" risulta presso ${startup.nome}.`
            );
            return;
        }

        this.partecipatoAdAttivitàDi.splice(index, 1);
        console.log(
            `🗑 Attività "${attività}" rimossa da ${startup.nome}.`
        );
    }

    profilaCittadino(): void {
        console.log(`\n🧍 CITTADINO: ${this.nome}`);
        console.log(`Età: ${this.età}`);
        console.log(`Interessi sportivi: ${this.interessiSportivi.join(", ")}`);

        console.log(`\n🍏 Prodotti usufruiti:`);
        if (this.usufruitiProdottiDi.length === 0) console.log("- Nessun prodotto");
        else {
            for (let i = 0; i < this.usufruitiProdottiDi.length; i++) {
                console.log(
                    `- ${this.usufruitiProdottiDi[i].prodotto} presso ${this.usufruitiProdottiDi[i].startup.nome}`
                );
            }
        }

        console.log(`\n🛎 Servizi usufruiti:`);
        if (this.usufruitiServiziDi.length === 0) console.log("- Nessun servizio");
        else {
            for (let i = 0; i < this.usufruitiServiziDi.length; i++) {
                console.log(
                    `- ${this.usufruitiServiziDi[i].servizio} presso ${this.usufruitiServiziDi[i].startup.nome}`
                );
            }
        }

        console.log(`\n🎯 Attività svolte:`);
        if (this.partecipatoAdAttivitàDi.length === 0) console.log("- Nessuna attività");
        else {
            for (let i = 0; i < this.partecipatoAdAttivitàDi.length; i++) {
                console.log(
                    `- ${this.partecipatoAdAttivitàDi[i].attività} presso ${this.partecipatoAdAttivitàDi[i].startup.nome}`
                );
            }
        }

        console.log("\n--------------------------------------------");
    }
}

// -------------------------------------------
//          ISTANZE DI STARTUP
// -------------------------------------------

const fitTrack = new Startup("FitTrack", "Wearable Tech", "Monitoraggio sportivo");
const aquaGym = new Startup("AquaGymPro", "Sport Acquatici", "Attività in piscina");
const runBoost = new Startup("RunBoost", "Corsa & Coaching", "Programmi di corsa personalizzati");

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

const incentivo1 = new Incentivo(101, "Bonus Wearables 2025", 150, "ISCRITTO", "MAGGIORENNE");
const incentivo2 = new Incentivo(202, "Bonus Piscina", 200, "RESIDENTE", "SPORT ACQUATICI");
const incentivo3 = new Incentivo(303, "Bonus Running", 180, "ATLETA", "CORSI CORSA");

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

const marco = new Cittadino("Marco", 28, "Corsa", "Palestra");
const lisa = new Cittadino("Lisa", 34, "Nuoto", "Yoga");
const gianni = new Cittadino("Gianni", 19, "Tecnologia", "Atletica Leggera");

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
