---
title: "Claude Code: benvenuti nell'era del coding agentico"
description: "Con Claude Code 2.0, Anthropic ha aperto la strada ad una nuova era dello sviluppo software. Non vibe coding, ma vera ingegneria del software potenziata dall'IA."
pubDate: 2026-01-09
image: "/images/blog/claude-code.webp"
imageAlt: "Claude Code - Agentic Coding"
lang: it
tags: ["intelligenza-artificiale", "llm", "claude-code", "software-engineering", "agentic-ai"]
---

Nelle ultime settimane sono avvenuti due fenomeni apparentemente opposti.

Sul fronte della narrazione mediatica relativa ai prodigi dell'Intelligenza Artificiale sono diventate decisamente dominanti le voci scettiche sulla reale capacità di creare valore dei nuovi strumenti alimentati dai Large Language Model.

Opinioni autorevoli di ricercatori dal curriculum importante come Gary Marcus, da sempre convinto che l'iper scaling dei modelli basati esclusivamente sul deep learning non avrebbe portato allo sviluppo della vera Intelligenza Artificiale, sono state improvvisamente rivalutate e riconsiderate da molti analisti e osservatori che in precedenza avevano sostenuto con convinzione questa tendenza.

Sul fronte del giornalismo scientifico ad indirizzo più pop, i soliti esperti e divulgatori di tecnologia, sempre pronti a cogliere la tendenza del momento, si sono affrettati a recuperare studi e ricerche prodotte da istituti blasonati per sostenere la nuova tesi dell'imminente scoppio della bolla dell'IA e commentare l'evidente fallimento di tecnologie fino a pochi giorni prima descritte come miracolose e destinate a cambiare il mondo (o quantomeno a distruggere l'intera umanità, se non attentamente governate).

Nel frattempo, fuori dai palcoscenici illuminati della ribalta mediatica generalista, Anthropic, una delle più importanti aziende del settore, principale concorrente della primadonna OpenAI, ha rilasciato la release 2.0 del suo *deep agent* **Claude Code**.

L'evento, come nello stile della sobria e *nerd* Anthropic, è avvenuto senza squilli di tromba e rulli di tamburo. Peccato, perché Claude Code release 2 è un vero miracolo.

O meglio, è veramente miracoloso quello che questo agente autonomo di programmazione riesce a fare.

Per chiunque sia impegnato nello sviluppo di applicazioni agentiche IA, Claude Code è sempre stato un benchmark di riferimento per quello che è possibile realizzare utilizzando un LLM allo stato dell'arte come backbone di un agente software.

Anthropic ha letteralmente aperto la strada e indicato la via ad un'intera nuova generazione di progettisti, pionieri della nuova disciplina denominata *agent engineering*.

## Claude Code e gli altri strumenti di coding

Claude Code non è l'unico prodotto del suo genere presente sul mercato.

Si tratta di strumenti che automatizzano lo sviluppo del software, cioè il coding, e che promettono di velocizzare in modo drastico la realizzazione di sistemi e applicazioni e di correggere in modo automatico gli inevitabili *bug* che vengono periodicamente riscontrati in qualunque applicazione.

GitHub Copilot (da non confondere con il copilot di Microsoft 365, la versione IA della celebre graffetta delle prime versioni di Office), Cursor AI, Devin AI, Replit e Codex di OpenAI sono alcuni tra i più noti.

Sono gli stessi strumenti che hanno entusiasmato i fan dell'IA della prima ora, portandoli a coniare uno dei termini più cretini nella storia del software engineering: il *vibe coding*.

Il *vibe coding* non funziona! Vi risponderanno gli esperti divulgatori dalle loro rubriche dedicate all'high tech sulle grandi testate giornalistiche, e hanno ragione, perché non ha mai funzionato e mai avrebbe potuto funzionare.

Ma qui non stiamo parlando di vibe coding.

## I limiti dei LLM

L'Intelligenza Artificiale attuale non è intelligente, questo lo sappiamo tutti, non è mai stata intelligente e anche questo lo abbiamo sempre saputo tutti, come abbiamo sempre saputo che si tratta di una tecnologia che simula bene il ragionamento umano, ma lo simula perché scrive, o meglio genera testo, frasi, risposte che suonano corrette e significanti nel nostro linguaggio naturale.

Ma l'IA non è in grado di comprendere realmente, manca di una vera capacità di interiorizzazione e relazione tra le sequenze di parole e simboli e un modello concettuale e finalistico del mondo fisico reale.

Un moderno LLM non è in grado di svolgere compiti che richiedono un'autentica creatività.

Non è possibile fornire una descrizione testuale delle funzionalità desiderate in una nuova applicazione software che sia mediamente più articolata, completa e complessa di un semplice prototipo dimostrativo o di una *proof of concept* e aspettarsi che un'IA generativa produca in autonomia un sistema software funzionante e pronto ad essere utilizzato in uno scenario reale.

Il problema è che l'informatica moderna è complessa e articolata. Non esiste un solo modo di fare le cose. Non esiste una sola soluzione ad una specifica tecnico-funzionale.

Per gli stessi problemi e per gli stessi settori applicativi esiste una moltitudine di *pattern* progettuali possibili e nessuno di essi è il migliore in assoluto.

La progettazione di un sistema complesso è un'arte che si apprende con il tempo e con l'esperienza. Ogni soluzione è un attento compromesso, frutto di scelte consapevoli tra esigenze contrapposte.

## I LLM eccellono nella generazione di codice

I linguaggi di programmazione sono molto più rigidi e formali rispetto ai linguaggi naturali. Nel codice software non ci può essere ambiguità.

I LLM che riescono a generare testi sintatticamente e semanticamente corretti in linguaggio naturale, a maggior ragione, eccellono nella generazione di codice.

Il codice generato da un moderno LLM è di qualità elevata. I costrutti sintattici tipici dello specifico linguaggio di programmazione sono usati in modo impeccabile e canonico. I design pattern implementati sono corretti e usati nel rispetto delle migliori best practices.

Se chiedo ad un LLM di generare un software che risolve un problema, implementa una funzionalità o un insieme di funzionalità, la cui soluzione può essere fornita entro alcune decine di migliaia di righe di codice, il risultato sarà sicuramente ottimo. Nel 99.9% dei casi otterrò una soluzione elegante e ben implementata secondo le migliori best practices.

Perché 99.9% e non 100%?

Perché gli LLM in realtà sono sistemi previsionali statistici, per cui, per quanto affinati e sofisticati, esiste sempre una probabilità diversa da zero per cui il processo generativo, che da token genera token, prima o poi prenderà la tangente e genererà un qualcosa che non funziona. Nel gergo del settore si dice che "ha avuto un'allucinazione".

Le allucinazioni capitano, sono fenomeni intrinseci di questo tipo di tecnologia, sono ineliminabili, ma non è questo il problema. Una generazione su 100 o su 1.000 non viene bene? Pazienza, testeremo il software, constateremo che è andata male, rilanceremo un nuovo round e (quasi) sicuramente andrà meglio.

## Il vero problema: la finestra di contesto

Il vero problema è un altro, e nasce quando vogliamo far generare un intero sistema di classe enterprise, cioè un sistema in grado di entrare in produzione in un reale contesto di automazione di processi aziendali.

Un sistema software moderno è complesso e articolato. Lo stack tecnologico è composto da molte componenti diverse e deve interfacciarsi con altri sistemi secondo protocolli diversi e non sempre standardizzati.

Un'applicazione reale è implementata attraverso milioni di linee di codice. Con meno di 100.000 linee di codice non puoi implementare alcuna applicazione completa che non sia una semplice utility di servizio.

Queste dimensioni di codice superano abbondantemente la cosiddetta "finestra di contesto" degli attuali LLM.

La finestra di contesto di un LLM rappresenta la dimensione massima del suo input.

Affinché l'output di un LLM mantenga qualità semantica e coerenza con l'input iniziale, occorre che l'intero prompt in input e tutto l'output generato siano all'interno della finestra di contesto.

Quando interagiamo con un LLM nel tipico dialogo o chat, in realtà causiamo l'invocazione del modello in modo iterativo.

Ad ogni nostro nuovo prompt, viene immesso nel LLM tutto l'elenco dei messaggi scambiati fino a quel momento, cioè tutti i nostri prompt, più tutti i testi generati in risposta, più una serie di testi che non vediamo, tipo il prompt di sistema definito dal provider del modello.

La finestra di contesto di GPT-5 è di 400.000 token circa, più o meno 350.000 parole. I modelli di Anthropic hanno in genere una finestra ancora più piccola, 200.000 token, 160.000 parole circa.

Un sistema software reale non è facilmente descrivibile con specifiche funzionali in poche centinaia di migliaia di parole, figuriamoci se ad ogni nuovo prompt dobbiamo anche aggiungere tutto il codice generato dal LLM in risposta ai primi prompt. Centinaia di migliaia di parole seguite da almeno mezzo milione di istruzioni di codice non hanno alcuna possibilità di stare tutte insieme in un'unica finestra di contesto.

Questo vuol dire che per fare vibe coding dovremo necessariamente far lavorare il LLM su porzioni limitate dell'intero contesto.

Ma se il LLM non ha in input l'intera base di codice non è più in grado di garantire una risposta corretta e globalmente coerente.

## Il fallimento del vibe coding

Se mettiamo un esperto del dominio applicativo, senza il supporto di uno sviluppatore software che conosce il linguaggio di programmazione, a dare istruzioni ad un ChatBot basato su LLM, man mano che la sessione procede, otterremo porzioni, moduli, di codice, localmente coerenti e corretti ma globalmente scorrelati tra loro. In breve tempo, l'integrazione dei diversi componenti software, generati in sessioni di lavoro che condividono in modo molto parziale il contesto reciproco, comincerà a dare errori e mostrare segni di incompatibilità.

Le richieste di debugging e correzione genereranno altre porzioni di software che sistemeranno alcuni malfunzionamenti generandone di nuovi.

Alla fine il risultato finale sarà una sgangherata collezione di componenti, spesso sovraingegnerizzati, impossibile da revisionare e correggere anche da parte di un team di sviluppatori esperti.

Gli, oramai rari, irriducibili sostenitori del vibe coding sono convinti che sia soltanto una questione di tempo. Siamo tutti d'accordo, è un problema di limiti nelle attuali finestre di contesto, ma non appena avremo LLM con finestre di contesto da 20-30 milioni di token ecco che il problema sarà risolto e il vibe coding diventerà realtà.

Purtroppo, per dirla con le parole di Gary Marcus, il deep learning e il suo trend di hyper scaling sono finiti contro un muro. La tecnologia sembra aver raggiunto il suo limite, continuare ad ingrandire i già grandi Large Language Model non porta più miglioramenti, anzi, in alcuni casi peggiorano. Forse non avremo mai LLM con finestre di contesto così grandi, non funzionerebbero.

## Il pair programming: un uso limitato

Per questo motivo, il caso d'uso tipico e più frequente d'impiego dei LLM nel coding resta quello della modalità denominata *pair programming*.

Il LLM è impiegato come assistente al lavoro di un software developer. Il programmatore scrive il suo codice, assistito da un LLM che completa il codice suggerendo l'implementazione di singoli moduli e analizzando il codice scritto alla ricerca di errori o incongruenze.

Si tratta di ben poca cosa rispetto al mito del codice generato automaticamente e interamente dall'IA.

Personalmente non credo nemmeno che il *pair programming* abbatta realmente i tempi di sviluppo. Da ex hacker degli anni '90 non ho mai trovato comodo l'uso dell'IDE e del mouse, abituato alla stratosferica velocità del *vi*, e penso che avere un editor che mentre stai scrivendo faccia comparire in grigetto nuove linee di codice, spostando a sorpresa il codice già scritto in alto e in basso, faccia più o meno lo stesso effetto di quando stai guidando di notte su una strada di montagna e il tuo passeggero accende improvvisamente la torcia del cellulare per cercare qualcosa che ha appoggiato sul sedile.

Ma non divaghiamo e torniamo al miracolo di Claude Code.

## Claude Code: non vibe coding, ma software engineering

Se Claude Code non è roba da vibe coding, allora cos'è?

Claude Code è un agente software, basato sui LLM di Anthropic, in grado di lavorare autonomamente per tempi molto lunghi, decine di minuti, teoricamente anche diverse ore, in grado di gestire una base di codice reale, complessa, con dimensioni anche di qualche milione di linee di codice.

Ma non è uno strumento di vibe coding.

Claude Code è uno strumento che sostituisce un intero team di programmatori e riesce a sostituire un intero team di programmatori perché è un capolavoro di *agent engineering* realizzato da ingegneri del software che sono palesemente tra i migliori ingegneri del software su questo pianeta, ed è un prodotto destinato ad ingegneri del software come loro, ma anche meno bravi di loro.

La differenza con gli strumenti di vibe coding è tutta qui, in questo posizionamento.

Uno strumento che promette il vibe coding si posiziona come sostituto di un ingegnere del software. L'utente dello strumento ipotetico di vibe coding è l'utente finale, o almeno un *power user* un utente in grado di fare *demand management* ma sempre un utente senza competenze operative di ingegneria del software.

L'utente di Claude Code, al contrario, è proprio l'ingegnere del software. Claude Code in mano ad un utente finale è praticamente inutile, finirebbe per essere semplicemente un ChatBot in grado di generare i soliti *slope content*, software incluso, di tutti i ChatBot IA esistenti.

## Come fa Claude Code a gestire grandi codebase?

Ma come fa Claude Code a generare intere *code base* da centinaia di migliaia, se non milioni, di linee di codice, coerenti, funzionanti e di qualità, usando modelli con *context window* da 200.000 token?

Lo fa emulando, nei modi in cui gli LLM emulano il lavoro intellettuale umano, il lavoro di un team di sviluppatori.

Nell'organizzazione dei progetti software di classe enterprise, nessun programmatore tiene a mente l'intera codebase.

In un team reale, gli sviluppatori hanno esperienze diverse, opinioni diverse sul miglior modo di scrivere software, competenze differenziate e spesso limitate ad un proprio set di pattern progettuali che usano in modo ripetitivo nel proprio lavoro.

Quando diversi anni fa conducevo grandi progetti software, aprendo un file di codice sorgente riconoscevo il programmatore che lo aveva realizzato semplicemente dallo stile e dalle soluzioni utilizzate.

Se ogni programmatore tende a produrre codice secondo pattern potenzialmente diversi, come può un progetto complesso convergere in un sistema perfettamente funzionante?

## Il ruolo del software engineering

Il segreto sta nelle capacità dei suoi team leader, cioè degli ingegneri del software che sovraintendono il progetto.

La naturale entropia caratteristica dei team di sviluppo viene contenuta e ricondotta ad un flusso produttivo attraverso la progettazione preventiva dei framework architetturali, la scelta dei design pattern, dello stack tecnologico, degli standard generali di progetto e degli standard di coding.

Durante la fase esecutiva viene condotta una costante attività di project management, il processo è costantemente ricondotto all'interno dei confini stabiliti.

Il software viene testato da personale specializzato non coinvolto nello sviluppo, il software viene sottoposto a sessioni di code review, ogni deviazione dagli standard viene corretta effettuando il refactoring del codice.

Ebbene, avendo a disposizione un sofisticato agente IA, in grado di effettuare sessioni di generazione del codice che non eccedano la finestra di contesto di un LLM, in grado di produrre codice di qualità accedendo a documentazione aggiornata su framework e librerie di sviluppo, sempre gestendo in modo corretto la finestra di contesto, parafrasando il titolo del paper che ha dato inizio alla rivoluzione LLM, possiamo dire che "all you need is software engineering".

## Claude Code come team di sviluppatori virtuali

Considerando che ogni volta che avviamo una nuova sessione di lavoro, in pratica una nuova chat, con un agente come Claude Code è come se avessimo di fronte un diverso sviluppatore umano, possiamo chiedergli di implementare uno specifico modulo o di effettuare una specifica modifica, specificando i framework architetturali e le politiche implementative da seguire per restare nei confini del progetto e della coerenza complessiva del sistema.

Così come un developer reale svolgerà il compito assegnato, producendo un codice non sempre funzionante (del resto è un essere umano) ma comunque perfettibile, anche la sessione di un agente IA ben fatto genererà un codice non sempre funzionante, imperfetto (del resto è un sistema di tipo statistico) ma perfettibile.

Sarà compito del project management e dell'organizzazione complessiva del progetto mitigare gli effetti dell'imperfezione, questa volta non più umana (ma cosa cambia?), attraverso sessioni di code review, test unitari e test di integrazione.

E qui viene il bello, un agente IA è in grado di effettuare code review e di automatizzare attività di test, e quindi, ancora una volta, tutto quello che serve è un bravo ingegnere del software con capacità di project leading.

Anziché organizzare e orchestrare un team di sviluppatori, tester e revisori umani, possiamo pianificare, organizzare il lavoro e orchestrare più sessioni di esecuzione di un buon agente IA.

## Claude Code 2.0: un'infrastruttura di software engineering

Eccoci arrivati al punto finale.

Cos'è esattamente Claude Code release 2? E, soprattutto, in cosa è superiore agli altri prodotti agentici come Copilot di Github, Cursor AI e Replit?

La potenza della release 2 di Claude Code, supera l'essere semplicemente il miglior agente di coding in circolazione, la sua potenza, infatti, consiste nell'essere una vera e propria infrastruttura di software engineering.

Claude Code è realizzato sul modello che ha determinato il successo e la superiorità del sistema operativo Unix: il banco dell'artigiano.

Claude Code è un'infrastruttura, costruita attorno ad una backbone che vanta i migliori LLM di mercato, composta da una molteplicità di strumenti (tool) specializzati e ben congeniati. Ogni tool fa una cosa sola, ma la fa in modo completo, efficace ed efficiente.

I software engineer possono organizzare e configurare i propri progetti, definendo standard, metodologie, prassi.

Il progetto può essere organizzato in cicli e fasi: progettazione, pianificazione, esecuzione, review, test, deployment.

Per ciascuna fase possono essere lanciate sessioni in parallelo. In una prima fase possiamo usare Claude Code per fare ricerche e analisi sui documenti di specifica, sui requisiti utente, su Internet per acquisire informazioni e analizzare mercato e prodotti concorrenti. Possiamo chiedere a Claude Code di riassumere e organizzare i risultati delle ricerche in documenti, possiamo chiedere di generare ipotesi di progetto alternative.

In sessioni separate possiamo chiedere a Claude Code di fare una review critica dei risultati prodotti nelle sessioni di brainstorming e ricerca di mercato.

Possiamo creare un tavolo di esperti virtuali e analizzare in parallelo ipotesi progettuali alternative, ottenendo consulenza e review, e raggiungere velocemente un piano di progetto robusto, affidabile e ben ponderato.

Sulla base della documentazione di progetto possiamo quindi avviare sessioni di coding orchestrate secondo le best practice di project management.

Attraverso i numerosi strumenti offerti da Claude Code è facile mantenere il progetto nei propri confini. La metodologia di lavoro è assolutamente analoga a quella impiegata con i team di sviluppo tradizionali.

## Produttività senza precedenti

La differenza di produttività è abissale. Una sessione di coding di Claude Code riesce a gestire il contesto, mantenendosi nei limiti dei 200k token, attraverso raffinate tecniche di agent engineering che prevedono l'offload su file system di informazioni non pertinenti al task corrente e il recupero successivo, la gestione della memoria di breve e lungo termine, l'impiego di tools di manipolazione dei file sorgenti che non consumano contesto e il lancio di sub-agenti in parallelo che lavorano con la propria finestra di contesto, con l'effetto di poter lavorare per decine e decine di minuti, producendo in un'ora quello che un developer umano è in grado di produrre in una giornata di lavoro.

## La nostra esperienza sul campo

Nell'ambito dell'Unione Comunicazione e Terziario di CNA Roma stiamo sperimentando l'uso di Claude Code dal giorno della sua uscita in Italia agli inizi del 2025, introducendolo in contesti specifici nelle aziende ICT che afferiscono al Digital Innovation Hub di Roma.

A partire dal mese di giugno 2025, ben prima dell'uscita della release 2 che ne ha sancito la superiorità rispetto agli agenti di coding convenzionali, siamo riusciti a definire le best practices d'impiego, anticipando molte automazioni e facilities che sono state successivamente incorporate come plug-in nell'attuale versione, raggiungendo la piena e totale automazione delle attività di coding.

I nostri associati, pionieri nell'uso di questo tipo di framework agentici, stanno rilasciando in questi giorni i primi prodotti software, interamente realizzati da Claude Code con una pura attività di supervisione e software engineering.

I primi effetti sull'organizzazione aziendale hanno riguardato la riqualificazione di molti sviluppatori e la ricollocazione su posizioni professionali di livello superiore.

Dal mio privilegiato punto di osservazione, mi sento di affermare che la nuova era dello sviluppo software è appena iniziata.
