# Linux Day 2025: Dalla Cybersecurity al Self Hosting Estremo di LLM

L'ultimo sabato di ottobre è una data in cui in Italia solitamente viene collocato il **Linux Day** cioè la giornata dedicata alla celebrazione del sistema operativo che oramai ospita la totalità dei grandi sistemi enterprise.

Le origini di questo esemplare sistema che ha mostrato al mondo in modo definitivo tutta la potenza del modello *open source* sono caratterizzate da un mix di miti e leggende, più o meno metropolitane, come è giusto che sia per un progetto di così grande successo.

Secondo la narrazione mediatica prevalente, Nel 1991, un giovane studente dell'Università di Helsinki, solitamente abbigliato con l'immancabile zainetto, icona dello studente tipo dell'epoca, di nome Linus Torvalds, iniziò per hobby lo sviluppo di un nuovo sistema operativo, di tipo Linux, per architetture PC Intel 386, il processore top di gamma di allora.

Dopo la pubblicazione del suo famoso post del 25 agosto 1991 su Internet (di solito non viene specificato cosa debba intendersi per "Internet", lasciando l'idea che si trattasse del web), il progetto ebbe un successo strepitoso, suscitando l'approvazione immediata del Popolo della Rete e il progetto crebbe a dismisura fino ad asfaltare i sistemi Unix proprietari di colossi quali IBM, HP e Sun Microsistem, diventando il sistema unico e standard che esiste oggi.

La storia che ricordo io è un po' diversa, anche perché all'epoca c'ero e in qualità di giovane neolaureato ero da poco impiegato in un'azienda romana, molto high tech, fortemente impegnata in progetti di innovazione tecnologica di respiro europeo.

Nell'ambiente dei progetti Exprit degli anni '90, la connessione ad Internet era una specie di obbligo, anché perché nelle aziende e organizzazioni che facevano parte di quella rete era in voga l'abitudine di comunicare via e-mail anziché attraverso il fax (qualcuno ricorda ancora cos'era il fax?).

Internet come la conosciamo oggi è nata solo nel 1996, con l'avvento dei provider ISP, cinque anni prima, se volevi essere connesso ad Internet andavi di persona al CNR, per la precisione al GARR, il Gruppo Armonizzazione Reti di Ricerca, dove dovevi convincere uno zelante ricercatore che anche tu e la tua azienda facevate ricerca sul serio e soprattutto dovevi negoziare l'assegnazione di un dominio, scontatamente in classe C, cercando di portare a casa un subnetting il meno penalizzante possibile.

Noi, ad esempio, ottenemmo dopo stressanti e lunghe trattative un dominio con maschera di sottorete 255.255.255.240 e riuscimmo a collegare tutti e 12 i PC che avevamo in ufficio.

Avete capito bene, all'epoca ogni PC di una LAN era direttamente collegato ad Internet, così, nudo e crudo, senza firewall con il tuo server di sviluppo che assurdamente faceva anche da router, essendo l'unico computer sempre acceso e in grado di fare dial-in on demand.

Ebbene, nel 91 non c'era il web come lo conosciamo oggi e soprattutto non c'erano i social network. I ricercatori come me si azzuffavano sui newsgroup. I newsgroup di allora erano come il bar o la mensa dell'università, che stavano alla ricerca accademica e industriale come il bar sport sta al mondo delle partite di pallone. Praticamente erano i social di allora.

Unix era il sistema operativo preferito dai ricercatori e dai developer indipendenti e un po' fricchettoni di allora. Le alternative industriali erano mostri come IBM CICS Cobol DB2, PDP 11, VAX, e poco dopo Windows NT server per le PMI.

Unix era un intero ecosistema, basato sul progetto open source dell'Università di berkley, ma già declinato in una miriade di dialetti e distribuzioni gravate da diritti di proprietà intellettuale.

Nel settore della ricerca ci accapigliavamo virtualmente su alcuni nuovi progetti di kernel, il cuore di un sistema operativo, per portare Unix sulle architetture PC Intel.

La diatriba più importante era incentrata attorno ad un progetto denominato **Minix** basato sul principio che un kernel dovesse essere il più piccolo possibile (mini-kernel) e tutto il resto doveva essere realizzato come modulo aggiuntivo e potenzialmente opzionale.

Ed ecco che ad agosto 1991, proprio sul newsgroup comp.os.minix, compare un post di questo ricercatore nordico, un po' spocchioso, io ricordo che fosse già un ricercatore non uno studente, che annunciava il suo "piccolo progetto di sistema operativo".

Non si trattava di un annuncio in punta di piedi, intriso di modestia, come potrebbe sembrare dal titolo, era una vera e propria provocazione. Sul newsgroup ufficiale e sacro del progetto Minix veniva pubblicata una vera e propria eresia, un kernel monolitico e pure bello grosso.

La discussione è rimasta accesa per molti anni, ma poi la realtà dei fatti ha messo tutti d'accordo, la fazione che voleva i kernel minuscoli, alla quale aderivo con convinzione, ha dovuto capitolare di fronte al fatto che fare i sistemi operativi con il kernel monolitico è molto più facile.

Complice l'indubbio valore del modello Unix, stante la forte esigenza di avere un sistema operativo server basato sulla sempre più estesa famiglia di processori Intel, considerata la potenza del modello open source, Linux, con il suo kernel obeso ma funzionante ha vinto, diventando l'emblema stesso dell'open source.

In realtà il modello Minix alla lunga è quello che ha vinto davvero. Il Linux di oggi ha un kernel modulare (ma guarda) e l'unica alternativa proprietaria ai sistemi operativi Microsoft Windows è MacOS che è basato proprio sul progetto Minix originale (il mondo è piccolo).

Tutta questa lunga digressione iniziale, per spiegare che quando, inaspettatamente, alcuni anni fa ho ricevuto l'invito da parte degli studenti d'Ingegneria dell'Università di Tor Vergata di Roma a proporre un talk in occasione del Linux Day di Roma, da loro organizzato, non potevo che accettare entusiasticamente.

Ogni anno il Linux Day ha un tema di riferimento. Quella volta il tema era l'Internet of Things.

La Fastal aveva partecipato a diversi progetti IoT ed era partner dell'iniziativa nata presso il Digital Innovation Hub di Roma di creazione della community locale The Things Network.

Stupidamente, immemore dei miei trascorsi da studente e ricercatore, mi presentai con un talk su un progetto reale, con un taglio noiosamente aziendale.

Il risultato fu che le due aule accanto a quella dove performavo come speaker erano piene, mentre la mia platea era costituita da una trentina di partecipanti, relativamente anzianotti.

Nonostante consideri questa mia prima esperienza un vero e proprio flop, fui nuovamente invitato come speaker per la successiva edizione.

Il tema questa volta era la cybersecurity. Decisi di rimediare al flop dell'anno precedente e prendermi una sorta di rivincita. Ragionai per molto tempo, non più da imprenditore, ma da giovane studente nerd.

Al Linux Day del 2024 mi presentai quindi armato di un piccolo e divertente dispositivo: il Flipper Zero, con tanto di scheda Wi-Fi. Il titolo del mio talk era un capolavoro di marketing: "Hacking di Reti Wireless con il Flipper Zero e Kali Linux".

Kali Linux in verità era buttato lì per contestualizzare meglio il talk in tema con la giornata, è un prodotto serio che usiamo realmente per il penetration testing e non è una roba facile da far vedere in 20 minuti, ma il Flipper Zero è un giocattolo poco pericoloso ma molto divertente e istruttivo.

Quando entrai l'aula era già piena, durante i 20 minuti di show la rete wi-fi pubblica dell'Aula 1 era diventata un vero carnevale, anche l'etereo spazio dove sui nostri dispositivi vediamo i nomi delle reti disponibili era stato reso inservibile, al posto dei SSID dele reti scorrevano le parole di una famosa canzone, poi compariva mille volte il nome della rete di aula ma connettendosi si finiva all'interno di pagine tarocche che sembravano quelle dei principali provider di streaming o siti di e-commerce. Risate e successo totale.

Credo che da allora, nessuno dei presenti in quell'aula abbia collegato mai più un suo dispositivo ad una rete aperta o pubblica.

Pertanto, una volta invitato al Linux Day 2025, il cui tema suonava meno entusiasmante: "il self hosting", cosa avrei potuto portare?

Dopo una lunga selezione di idee scartate, ne emerse una originale: il self hosting estremo di LLM.

Nella primavera del 2025 iniziavano ad affermarsi i modelli LLM open source, o open weight.

Le nuove tecniche di ottimizzazione, quantizzazione e distillazione dei LLM e l'impiego delle nuove architetture System 2 e Mixture of Experts aveva consentito il rilascio di modelli di piccole dimensioni particolarmente performanti.

Gli LLM Open Source rappresentano un'opportunità molto interessante per le aziende che tipicamente sono nel nostro target di mercato, perché abattono i costi di esercizio, prevengono il vendor lock-in e soprattutto sono deployabili all'interno di data center convenzionali, con upgrade minimi in GPU anche di classe consumer, garantendo il 100% di privacy e GDPR Compliance.

Far girare un LLM Open su un nodo con GPU 5090 e 32 Gbyte di RAM convenzionale è facilissimo, ma fino a che punto possiamo spingere il downsizing dell'hosting?

Ecco la sfida: far girare un LLM e implementare un chatbot IA generalista su una Raspberry Pi.

Ovviamente un po' di RAM ci vuole, per cui il minimo sindacale per l'esperimento è la nuova Raspberry Pi 5 con 16 Gbyte di RAM, un piccolo gioiellino da circa 100 Euro.

Detto, fatto. All'edizione Linux Day 2025 ho presentato l'esperimento in presa diretta.

L'aula era gremita, oramai comincio ad avere la mia fan base.

Sul tavolo una Raspberry Pi 5, impacchettata con il *cooler* ufficiale a ventolina e HAT di espansione per avere come memoria di massa una SSD da 512 Gbyte.

A bordo una installazione di **Ollama** e **Open WebUI**, configurati a puntino, con una bella collezione di modelli quantizzati a 4 bit, tra cui gli incredibili Qwen2.5-vl e Qwen3 di Alibaba.

Come collegarsi al ChatBot? Dopo lo show dell'anno precedente non avrei mai potuto collegarmi alla rete di aula che avevamo hackerato e deriso per essere un vero colabrodo.

La soluzione è stata una mini configurazione on-premise di rete Wi-Fi, con un AP implementato su un piccolo dispositivo SoC di produzione Samsung, ovviamente ben protetta e configurata. Un unico punto di vulnerabilità, attaccabile con l'unica tecnica che non conosce protezioni tecnologiche: l'ingegneria sociale.

La rete aveva un SSID apparentemente bizzarro: Wintermute_Mainframe, per connettersi una password che ho finto di mantenere segreta (altrimenti vi connettete in 200), ma ho buttato lì una frase sibilinna, fintamente per caso, "spero che nessuno colga la citazione".

Il ChatBot sembrava veramente ChatGPT, rispondeva fluidamente, a tono e in pochi secondi ha sciorinato il codice Python per risolvere il puzzle della Torre di Hanoi con algoritmo ricorsivo.

Un'IA comparabile al ChatGPT del 2023 era in esecuzione senza richiedere un reattore nucleare dedicato, su un dispositivo collegato tramite un caricatore USB-C ad una normale presa elettrica, scaldando giusto un poco.

Dopo alcuni minuti, qualcuno ha colto il mio gancio e ha capito, la cultura CyberPunk è ancora viva, è entrato nella Raspberry Pi e ha dato il comando di shutdown. Ci sono giovani promettenti nelle nostre aule universitarie.

