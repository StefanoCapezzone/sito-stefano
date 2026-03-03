---
title: "Come cambiano le skill dei software developer nell'era del coding agentico"
description: "L'impresa software dopo l'avvento di Claude Code: ruoli, competenze e trasformazioni organizzative. Analisi delle figure professionali in ascesa e in declino."
pubDate: 2026-03-03
image: "/images/blog/developer-skills-agentic-era.webp"
imageAlt: "Nuove competenze software engineering nell'era del coding agentico"
ogImage: "/images/blog/developer-skills-agentic-era-og.webp"
lang: it
tags: ["intelligenza-artificiale", "software-engineering", "agentic-ai", "competenze-digitali", "trasformazione-digitale"]
---

> **In sintesi**: Tra la fine del 2025 e l'inizio del 2026, strumenti come Claude Code hanno raggiunto una soglia di capacità tale da modificare radicalmente il flusso di lavoro degli sviluppatori. Le figure chiave diventano Software Engineer e Architect, mentre i ruoli tradizionali di junior developer, specialista di linguaggio e tester manuale sono in declino. Le competenze strategiche — pensiero sistemico, decomposizione dei problemi, giudizio critico — diventano le più preziose perché le più difficili da automatizzare.

## Una svolta epocale

Il punto di svolta è arrivato, evidente, tangibile, inequivocabile.

Era nell'aria da tempo, i segnali erano chiari, eppure è stato sorprendente.

Personalmente, aspettavo questo momento dal 1990, l'anno della mia laurea. La mia tesi di Laurea era sull'Intelligenza Artificiale: *"Un prototipo di Sistema Esperto per la Progettazione Concettuale Statistica"*.

Un sistema che riceveva specifiche in linguaggio naturale e produceva un modello concettuale di database.

Il lavoro era parte di un più ampio progetto del Dipartimento di Informatica e Sistemistica della Sapienza di Roma che aveva come obiettivo finale quello di realizzare uno strumento IA che consentisse di sviluppare software usando l'italiano anziché un qualunque linguaggio di programmazione.

Erano tempi di entusiasmo per l'IA, il Giappone aveva finanziato un grande progetto nazionale per raggiungere la V Generazione di Computer. Computer realmente intelligenti in grado di superare il Test di Turing, una roba alla HAL 9000, simile ai computer di Star Trek che si attivavano alla frase: "*Hey, Computer!*".

La Quinta Generazione era attesa per il 1993, al massimo 1995.

La Quinta Generazione di Computer non è mai arrivata, al suo posto l'ennesimo, lungo, inverno dell'IA.

In tempi primaverili più recenti qualcuno attendeva l'AGI, l'Intelligenza Artificiale Generale, è più o meno la stessa cosa, ma forse non arriverà a breve neanche quella.

Ma forse, non ha importanza, perché nel frattempo, proprio quando l'entusiasmo sui LLM iniziava a raffreddarsi, è arrivato qualcos'altro. Qualcosa di ambito più limitato, ma altrettanto utile e potente.

L'ambito è proprio quello della mia tesi di laurea: l'Ingegneria del Software.

Tra la fine del 2025 e l'inizio del 2026, diversi modelli — **Opus 4.6** di Anthropic, **GPT-Codex-5.3** di OpenAI e **Gemini 3** di Google — hanno raggiunto una soglia di capacità tale da modificare radicalmente il flusso di lavoro degli sviluppatori.
**Boris Cherny**, creatore di Claude Code, ha dichiarato che nel suo ultimo mese da ingegnere non ha aperto un IDE: tutto il codice *committato* (circa 200 PR) è stato scritto autonomamente dall'IA.
Secondo un ingegnere senior di Google, Claude Code può compiere in un'ora il lavoro di un anno.

Non si tratta una sparata mediatica. È tutto vero.

Tra il mese di luglio 2025 e la data di pubblicazione di questo articolo, presso il Digital Innovation Hub di Roma, aziende come Chirale e Fastal hanno complessivamente effettuato una decina di importanti rilasci software, **senza che alcuno sviluppatore abbia scritto una sola istruzione di codice**.

## La nuova realtà operativa

Rakuten dichiara di aver testato Claude Code su codebase da 12,5 milioni di righe, completando task complessi in sette ore di lavoro autonomo con accuratezza al 99,9%.

TELUS dichiara di aver creato oltre 13.000 soluzioni AI personalizzate, spedendo codice il 30% più velocemente e risparmiando oltre 500.000 ore.

Un altro elemento importante riguarda la qualità del codice.

Il codice sviluppato con il supporto dell'IA generativa, fino alla primavera del 2025, frutto di attività di *pair programming* assistiti da applicazioni ChatBot tradizionali o strumenti come GitHub Copilot, non aveva caratteristiche tali da poterlo considerare *production ready*.

Dal giugno 2025, è cambiato tutto.

Strumenti come Claude Code sono molto più complessi delle semplici app come ChatGPT o Claude.ai.

Come ho scritto sul [blog di Fastal](https://www.fastal.it/it/blog/2026-02-intelligenza-agentica-harness/), si tratta di prodotti basati su un nuovo paradigma architetturale, in grado di *imbrigliare* i LLM e finalizzarne il comportamento con un forte focus sullo specifico progetto.

Il prodotto di questi agenti sono codebase di alta qualità, coerenti e conformi agli standard dei rispettivi progetti, complete in tutti quei dettagli implementativi che fanno la differenza in termini di qualità, come gestione accurata delle eccezioni, controllo forte dei tipi, *schema validation* e *test suite* automatiche.

Vera fantascienza per molte software house nostrane.

Nell'ambito del Gruppo Fastal, la differenza qualitativa tra le codebase di nuova produzione e l'oceano di codice legacy è risultata talmente evidente che abbiamo avviato processi di refactoring e consolidamento talmente estesi da saturare gli abbondanti *usage limits* dei nostri abbonamenti di fascia alta ai servizi di Anthropic & Co.

Strati e strati di debito tecnico, accumulati sui nostri sistemi più antichi, sono stati spazzati via in pochi mesi, con un effort incredibilmente basso.

Tutto questo, però, non è automatico.

Questi risultati sono possibili solo attraverso una profonda e radicale riorganizzazione del lavoro di sviluppo software e un accurato processo di *reskilling* dei developer più anziani.

## Un nuovo mix di figure professionali

Il mix tradizionale di figure professionali, basato su pochi senior engineer o architect e molti developer, deve cambiare.

Il ruolo tradizionale dello sviluppatore si trasforma: nel 2026, il compito non è più scrivere codice ma **dirigere agenti AI** che lo scrivono.

Le competenze chiave includono la decomposizione dei problemi, la formulazione di prompt precisi, la revisione degli output e la capacità di ragionare su sistemi, modalità di fallimento e trade-off architetturali.

Come osservato da Andrej Karpathy, ex AI Director in Tesla ed ex OpenAI, esiste "un nuovo livello programmabile di astrazione" che include: agenti, sotto-agenti, prompt, contesti, memoria, strumenti, plugin e integrazioni IDE.

### Ingegneri e Architetti del Software

Le figure chiave diventano i Software Engineer e i Software Architect, professionisti in grado di avere una visione sistemica delle applicazioni e dei progetti, in grado di valutare e discutere soluzioni, stack tecnologici e scelte implementative di base.

Nella nuova organizzazione dell'era del coding agentico, sono il fattore umano che governa e potenzia gli *harness* a cui è demandato il lavoro più operativo.

Le competenze di base sulle tecnologie e sui design pattern non sono sufficienti. Occorrono soft skill particolari e capacità di *context engineering*.

### AI Product Manager

I product manager stanno acquisendo un ruolo potenziato dall'AI: analisi competitive che prima richiedevano settimane ora si completano in ore, e il *vibe coding* permette di prototipare rapidamente idee senza dipendere dall'engineering. Il PM del 2026 deve saper tradurre visione di prodotto in specifiche tecniche che gli agenti AI possano implementare efficacemente.

### Quality Assurance

Il testing manuale come lo abbiamo conosciuto finora sta diventando obsoleto. Gli agenti AI possono generare test funzionali ed esplorativi automaticamente, predire edge case e mantenere le suite di test al passo con l'evoluzione del software.

I professionisti QA si trasformano da esecutori a **strateghi**: supervisionano agenti di test, definiscono strategie di copertura e si concentrano su test creativi, UX e considerazioni etiche.

## Figure professionali in declino

### UX Designer

Il ciclo tradizionale di sviluppo delle app, basato su prototipazione wireframe, mock, rendering su Figma e hand-off verso i developer, non è più compatibile con la velocità di coding disponibile attraverso i nuovi strumenti.

L'UX Designer diventa un collo di bottiglia inaccettabile, che riporta la velocità effettiva di avanzamento dei progetti ai livelli tradizionali.

Strumenti come Claude Code sono in grado di sviluppare in pochi minuti prototipi di UI perfettamente funzionanti, sono in grado di lanciare autonomamente l'esecuzione delle interfacce, di catturare screenshot e valutare, sfruttando le capacità di visione artificiale dei LLM SOTA che li alimentano, la rispondenza ai requisiti espressi ma anche alle best practices di estetica e usabilità.

A questo proposito è particolarmente significativa l'intervista a Jenny Wen, ex Figma e attuale Director of Design in Anthropic, per il Lenny's Podcast, dal titolo molto chiaro: ["The design process is dead. Here's what's replacing it"](https://youtu.be/eh8bcBIAAFo?si=Ghx3ZUjTeCOvfalM).

### Junior developer tradizionale

La vittima più ovvia.

La maturazione degli agenti di coding nella seconda metà del 2025 ha distrutto il gradino più basso della scala professionale.

Scrivere boilerplate, generare unit test e refactorare codice legacy — attività che formavano i junior — sono ora a costo marginale zero.

Un rapporto di Indeed rivela che i ruoli di sviluppo software sono diminuiti del 3,5% anno su anno, con un calo particolarmente marcato nelle posizioni entry-level.

Il 78% dei ruoli tech richiesti dalle offerte di lavoro prevede tra i requisiti la familiarità con l'IA.

Questo crea un paradosso critico: se le aziende eliminano le posizioni junior, non ci sarà nessuno a ricoprire le posizioni senior in futuro. Il rischio è quello di un "Competence Cliff" — un baratro di competenze nella pipeline dei talenti.

### Specialista di linguaggio / stack specifico

La distinzione tra "sviluppatore Java", "sviluppatore PHP" o "sviluppatore frontend/backend" si sta dissolvendo. Con l'AI che scrive codice competente in quasi tutti i linguaggi e framework popolari, un ingegnere backend può generare codice frontend decente, cross-platform o persino mobile nativo tramite prompt.

Perché ricercare e assumere sviluppatori frontend e backend separati, quando un *harness* come Claude Code si esprime alla perfezione in qualunque linguaggio di programmazione moderno e applica i migliori design pattern, in modo perfettamente idiomatico, in qualunque moderno framework senza problemi e ritardi dovuti alla *curva di apprendimento*?

I software architect del 2026 possono finalmente scegliere lo stack tecnologico più adatto al progetto, senza vincoli legati al portfolio di skill esistenti in azienda.

Le competenze sui framework e sui linguaggi si spostano dall'abilità idiomatica e dalla quantità di conoscenze sintattiche, alla capacità di valutazione critica dei corretti ambiti d'impiego delle soluzioni.

### Tester manuale tradizionale

Le posizioni che si basano esclusivamente sul testing manuale sono sempre più rare. L'AI agentica può simulare interazioni umane, testare continuamente in ambienti production-like e fornire insight azionabili più velocemente di qualsiasi umano.

Si passa da un modello QA "manual-first" a un modello "automation + AI-first".

### Implementatore di ticket

La figura dello sviluppatore che riceve un ticket JIRA ben definito e lo implementa senza farsi domande è in via di estinzione.

Già oggi, aziende pioniere dell'automazione IA, come ad esempio Cursor, hanno automazioni che inoltrano automaticamente i ticket agli agenti IA, che effettuano il debug, la correzione e il deployment del codice.

## Le competenze strategiche e trasversali che contano

Le competenze "soft" diventano paradossalmente le più difficili da automatizzare e quindi le più preziose:

- **Pensiero sistemico**: la capacità di ragionare su architetture, modalità di fallimento e trade-off è il vero discriminante tra chi dirige l'AI efficacemente e chi no.
- **Decomposizione dei problemi**: definire problemi in modo chiaro, stabilire vincoli e requisiti precisi è la competenza che determina la qualità dell'output AI.
- **Competenza di dominio**: conoscere profondamente il business domain consente di chiedere all'AI le cose giuste. Senza comprensione di manutenibilità, sicurezza e scalabilità, l'AI non le includerà spontaneamente.
- **Giudizio critico e ownership**: l'AI produce codice rapidamente, ma qualcuno deve assumersi la responsabilità della correttezza, dell'affidabilità e delle conseguenze.
- **Collaborazione cross-funzionale**: i confini tra PM, designer, engineer e QA si sfumano; la capacità di lavorare trasversalmente diventa essenziale.

## Impatto sull'organizzazione delle grandi aziende

La rivoluzione apportata dai nuovi strumenti non riguarda solo le software house, l'introduzione dell'IA, se ben orchestrata, può fare la differenza anche nelle aziende più strutturate operanti in qualunque industry.

### Da gerarchie funzionali a piattaforme e pod

Le organizzazioni ripensate in logica AI-first devono abbandonare le gerarchie funzionali tradizionali a favore di **strutture basate su piattaforma**, con team cross-funzionali modulari e riconfigurabili, organizzati intorno ai flussi di dati e ai processi algoritmici.

Invece dei silos dipartimentali — marketing, operations, finance — il lavoro deve essere strutturato in "pod" o "squad" che combinano specialisti tecnici, esperti di dominio e personale operativo con responsabilità condivisa end-to-end.

### Team più piccoli, output maggiore

L'effetto moltiplicatore dell'AI consente a team ridotti di produrre output precedentemente riservati a team molto più grandi. Processi che richiedevano due giorni ora possono essere completi in ore.

Tutte quelle automazioni estemporanee che non potevano diventare progetti di sviluppo software esternalizzati possono oggi essere risolte con la generazione di app usa e getta.

Questo implica una ristrutturazione profonda degli organici nei dipartimenti IT: meno sviluppatori generalisti, più figure senior con capacità di orchestrazione e visione strategica.

## Il paradosso della pipeline dei talenti

Questo scenario, tuttavia, mostra delle criticità.

La questione più insidiosa è la formazione delle nuove generazioni. Se il coding manuale è stato storicamente il terreno di apprendimento dei junior developer, eliminare queste posizioni significa eliminare il percorso formativo che produce i senior di domani.

Come nel vecchio adagio "writing is thinking", anche "coding is thinking": quando si delega tutto all'AI, si rischia di perdere la comprensione profonda dei problemi che il codice tenta di risolvere.

Occorre trovare un equilibrio: in Fastal stiamo proponendo l'IA come strumento di apprendimento accelerato (non come sostituto dell'apprendimento) e ridisegnando i percorsi di carriera junior attorno a competenze di supervisione, review e pensiero sistemico fin dal primo giorno.

## Raccomandazioni per le aziende del settore SW

Nell'ambito della nostra Unione di Mestiere in CNA Roma, stiamo definendo un decalogo di raccomandazioni per le aziende che si occupano di sviluppo software:

- **Ridefinire i profili di assunzione** attorno a capacità architetturali, pensiero sistemico e competenze di dominio, più che alla padronanza di linguaggi specifici
- **Investire in governance del codice AI-generated**: test automatizzati, pipeline CI/CD robuste e standard di sicurezza diventano l'infrastruttura critica
- **Mantenere una pipeline di talenti junior** riprogettata: i nuovi assunti devono imparare a dirigere l'AI, non a essere sostituiti da essa
- **Adottare strutture organizzative platform-based** con pod cross-funzionali e ruoli di governance algoritmica

Abbiamo raccomandazioni anche per i giovani talenti che si affacciano ora in questo settore:

- **Sviluppare visione architetturale**: è il moltiplicatore più potente nell'era AI. La conoscenza di design pattern, ottimizzazione, sicurezza e gestione del debito tecnico non è più limitata dalla velocità di digitazione
- **Padroneggiare l'orchestrazione di agenti**: comprendere come strutturare prompt, contesti, permessi e workflow multi-agente
- **Approfondire il dominio di business**: l'AI amplifica qualunque competenza di dominio si possieda — testing robusto, architettura modulare e pratiche CI/CD rendono l'AI più sicura e potente
- **Non smettere di comprendere il codice**: anche se non lo si scrive più manualmente, la capacità di leggere, valutare e debuggare resta fondamentale per garantire qualità e sicurezza

*Per approfondire il tema degli strumenti di coding agentico, leggi il mio articolo su [Claude Code e l'era del coding agentico](/it/blog/claude-code-agentic-coding).*
