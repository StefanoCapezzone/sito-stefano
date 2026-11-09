---
title: "Le passkey non sono una trappola: la mia replica a The Hack"
description: "Un post virale su Substack invita a non usare le passkey e a tornare ai codici OTP. Ha ragione sulla governance, ma sbaglia bersaglio: ecco perché."
pubDate: 2026-11-09
lang: it
tags: ["cybersecurity", "passkey", "autenticazione", "phishing", "open-source"]
---

> **In sintesi**: Il post *Passkeys are a trap* ha ragione su due cose: chi scrive gli standard non rappresenta gli utenti, e fino al 2025 le passkey erano davvero difficili da portare via da un ecosistema. Sbaglia però sul meccanismo, perché l'attestazione WebAuthn non rivela il sistema operativo e le passkey sincronizzate non la forniscono affatto. E sbaglia soprattutto sul rimedio: il codice TOTP che propone è proprio ciò che i kit di phishing più diffusi oggi rubano in tempo reale. La paura di un web che esclude chi usa Linux è legittima, ma passa per altri strumenti, e non si combatte rinunciando all'unica difesa diffusa contro il phishing.

## Un post che merita una risposta

Il 10 ottobre 2026 un autore che firma con lo pseudonimo The Hack ha pubblicato su Substack un post dal titolo inequivocabile: [*Passkeys are a trap. Do not use them.*](https://nonfunctional.substack.com/p/passkeys-are-a-trap-do-not-use-them)

In pochi giorni ha raccolto quasi 2.800 apprezzamenti, oltre mille punti e quasi seicento commenti su Hacker News.

La tesi è questa: dietro la comodità dell'accesso senza password si nasconderebbe un cavallo di Troia, la possibilità per i grandi fornitori di piattaforme di decidere quali dispositivi e quali sistemi operativi abbiano diritto di accedere ai servizi online. Il rimedio proposto è tornare ai codici a sei cifre generati dalle app di autenticazione.

Sul [blog di Fastal](https://www.fastal.it/it/blog/2026-11-passkey-in-azienda/) ho scritto un'analisi dedicata alle aziende, e lì ho precisato che non voleva essere una replica: l'obiettivo era dare a clienti e lettori indicazioni operative.

Questa, invece, è la mia replica.

La scrivo perché il post tocca una corda che conosco bene. Ero sui newsgroup quando Torvalds annunciò il suo «piccolo progetto di sistema operativo», e da alcuni anni porto un talk al [Linux Day](/it/blog/linux-day-2025/) di Roma. L'idea di un web che decide se il mio sistema operativo è «approvato» mi inquieta quanto inquieta l'autore.

Proprio per questo credo che valga la pena di guardare con attenzione dove punta il dito. Perché, a mio avviso, punta nel posto sbagliato.

## Dove ha ragione

Comincio da ciò che regge, perché c'è.

**La governance degli standard.** L'autore osserva che nella FIDO Alliance, il consorzio che definisce le passkey, non siedono associazioni di consumatori. È vero: l'elenco dei membri comprende aziende tecnologiche, banche, alcuni enti governativi (fra cui il BSI tedesco, l'NCSC britannico e il NIST) e centri di ricerca. Non prova alcuna cattiva intenzione, ma è un buon motivo per tenere gli occhi aperti.

**Il termine «passkey» è ambiguo.** Sotto lo stesso nome convivono credenziali molto diverse. Le passkey **sincronizzate** vivono nel gestore di password (iCloud Keychain, Google Password Manager, 1Password, Bitwarden) e si replicano su tutti i dispositivi: sono sicure quanto l'account cloud che le custodisce. Le passkey **vincolate al dispositivo**, come quelle delle chiavi fisiche tipo YubiKey, non lasciano mai l'hardware: non si copiano, e per la stessa ragione si perdono con il dispositivo. Chi parla di passkey senza distinguere le due famiglie confonde il discorso.

**Il lock-in era reale.** Fino al 2025 le passkey si potevano usare da altri dispositivi, ma non si potevano trasferire in blocco da un gestore all'altro. Chi diffidava aveva buone ragioni.

Fin qui, nessuna obiezione. I problemi cominciano dopo.

## Dove sbaglia: l'attestazione non è quello che sembra

L'argomento centrale del post è che le passkey permettano ai siti di verificare sistema operativo e firmware dell'utente, e quindi di escludere Linux o qualunque software non gradito.

Qui si confondono tre meccanismi diversi.

1. **I flag dell'autenticazione.** A ogni accesso il sito riceve quattro indicatori binari: UP (l'utente era presente), UV (l'utente è stato verificato con biometria o PIN), BE (la credenziale può essere sincronizzata), BS (la credenziale è sincronizzata). Servono, per esempio, a pretendere la verifica dell'utente. Non dicono nulla del sistema operativo.
2. **L'attestazione WebAuthn.** È una dichiarazione firmata, facoltativa, che identifica marca e modello dell'autenticatore tramite un codice chiamato AAGUID. La [specifica del W3C](https://www.w3.org/TR/webauthn-3/) la descrive come prova dell'«origine di un autenticatore», e il valore predefinito della richiesta è «nessuna attestazione». Come ha scritto Scott Helme nella sua [replica del 14 ottobre](https://scotthelme.co.uk/passkeys-are-not-a-trap/), l'attestazione «non dice nulla del vostro sistema operativo, del browser, delle estensioni».
3. **La verifica d'integrità del dispositivo.** Stabilire se un telefono è stato manomesso è compito di meccanismi come Play Integrity di Google o App Attest di Apple. Esistono indipendentemente dalle passkey e molte app bancarie li usano da anni.

C'è poi un limite pratico che chiude la questione per il grande pubblico: **le passkey sincronizzate non forniscono attestazione**. Lo scrive nero su bianco la [documentazione di Microsoft Entra](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-synced-passkeys) («Synced passkeys don't support attestation»). E lo ha ribadito Ricky Mondello, che in Apple si occupa dei sistemi di autenticazione, in un [post pubblicato durante la discussione](https://hachyderm.io/@rmondello/117428258722253709): quando le banche hanno chiesto l'attestazione sulle passkey sincronizzabili, piattaforme e browser hanno risposto che l'obiettivo è combattere il phishing, non costruire uno schema di *trusted computing*. Con una chiusa che non lascia spazio a interpretazioni: «Passando sul mio cadavere».

L'autore stesso, in una nota aggiunta dopo la pubblicazione, ha ritrattato l'ipotesi che uno dei flag segnalasse un'attestazione remota del sistema.

Questo non significa che il rischio non esista. Significa che sta altrove. Un servizio che vuole discriminare i dispositivi ha già oggi gli strumenti per farlo, e le passkey non li rendono né più né meno potenti. Il problema è di governance dei grandi servizi, non di protocollo.

## Dove sbaglia di più: il rimedio

Se l'analisi sull'attestazione è imprecisa, la proposta finale è quella che mi preoccupa davvero. Tornare al TOTP, il codice a sei cifre che si rinnova ogni trenta secondi, significa tornare esattamente al punto in cui gli attaccanti ci aspettano.

La tecnica si chiama **adversary-in-the-middle** (AitM). Il sito contraffatto non si limita a raccogliere la password: si mette in mezzo, come intermediario verso il sito autentico. L'utente digita password e codice, il proxy li inoltra in tempo reale e si tiene il cookie di sessione. Trenta secondi di validità bastano e avanzano.

Non è un'ipotesi da laboratorio. Secondo il [*Microsoft Digital Defense Report 2026*](https://aka.ms/Microsoft-Digital-Defense-Report-2026), fra luglio 2025 e giugno 2026 l'AitM è stato il **44,6%** delle tecniche di phishing rilevate, contro il 33,6% del phishing classico tramite link e il 12,9% degli allegati malevoli. Uno dei kit più diffusi, Tycoon2FA, era associato a oltre **15 milioni di email al mese** nella seconda metà del 2025, prima che Microsoft ed Europol lo smantellassero nel marzo 2026.

E poi c'è il telefono. A gennaio 2026 il [Google Threat Intelligence Group](https://cloud.google.com/blog/topics/threat-intelligence/expansion-shinyhunters-saas-data-theft) ha documentato campagne in cui finti tecnici IT chiamavano i dipendenti per «aggiornare le impostazioni MFA», portandoli su siti clone con il marchio dell'azienda. Conclusione del rapporto: chiavi FIDO2 e passkey resistono a questo tipo di attacco, notifiche push e SMS no.

La ragione è semplice. Una passkey è legata al dominio per cui è stata creata. Se finisco su `examp1e.com` invece che su `example.com`, il browser non me la propone: non c'è nulla da digitare, quindi nulla da consegnare all'impostore. Un codice TOTP invece lo leggo e lo trascrivo, e posso trascriverlo ovunque.

Per questo il NIST, nella [revisione 4 della SP 800-63B](https://pages.nist.gov/800-63-4/sp800-63b/authenticators/) del luglio 2025, stabilisce che gli autenticatori basati sull'inserimento manuale di un codice «non devono essere considerati resistenti al phishing». La [CISA](https://www.cisa.gov/sites/default/files/2023-01/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf) definisce l'MFA resistente al phishing il «gold standard» e osserva che l'unica forma ampiamente disponibile è quella basata su FIDO/WebAuthn.

Ma l'argomento più forte lo fornisce l'autore stesso. Nelle note aggiunte dopo la pubblicazione riconosce che le passkey sono vincolate al dominio, quindi resistenti agli attacchi man-in-the-middle, e che sono «decisamente più sicure del TOTP».

A questo punto la domanda è inevitabile: se sono decisamente più sicure, perché dire alla gente di non usarle?

## Il lock-in: un'obiezione da aggiornare, non da archiviare

Sulla portabilità il quadro è cambiato nel corso del 2026.

La FIDO Alliance ha definito il **Credential Exchange**, che si articola in un formato (CXF, pubblicato come *Proposed Standard* 1.0) e in un protocollo (CXP, ancora in bozza). Da iOS e macOS 26 le passkey si trasferiscono fra l'app Password di Apple e gestori come 1Password, Bitwarden e Dashlane con un selettore di sistema, senza file intermedi. Su Android il trasferimento funziona fra Google Password Manager e i gestori compatibili, con requisiti di versione che cambiano da prodotto a prodotto.

Mondello lo ha sintetizzato in una frase del suo [articolo di settembre](https://rmondello.com/2026/09/07/switching-password-managers-2026/): «Nessuno dovrebbe sentirsi prigioniero del proprio gestore di password».

Detto questo, l'interoperabilità non è ancora completa, e qui l'utente open source ha più di una ragione per lamentarsi. Non tutte le combinazioni funzionano in entrambe le direzioni. KeePassXC esporta e importa le passkey in un formato proprio, un file JSON non cifrato, ma non supporta ancora lo standard FIDO. Le chiavi vincolate al dispositivo, per definizione, non si esportano.

La critica sul lock-in, quindi, va tenuta viva. Ma la strada per vincerla passa dal pretendere che i gestori open source implementino il Credential Exchange, non dal rinunciare alle passkey.

## La paura giusta, il bersaglio sbagliato

Rileggendo il post, ho l'impressione che il suo vero bersaglio non siano le passkey. È un futuro in cui pochi grandi fornitori decidono chi è ammesso a usare internet e con quale dispositivo.

È una paura che condivido. Ma quel futuro, se arriva, non arriva dalle passkey. Arriva da Play Integrity e App Attest, già oggi usati per rifiutare telefoni con sistemi modificati. Arriva dalle politiche dei singoli servizi. Arriva dalla concentrazione del mercato.

L'[EFF](https://www.eff.org/deeplinks/2023/10/passkeys-and-privacy), già nel 2023, aveva indicato il confine giusto: i siti rivolti ai consumatori non dovrebbero chiedere marca e modello dell'autenticatore. È una battaglia sensata e circoscritta, che si può combattere senza buttare via la tecnologia.

Dire alle persone di non usare le passkey ha invece un costo immediato e certo: lasciarle esposte all'attacco che oggi funziona meglio. Il costo del futuro distopico è ipotetico; quello del phishing si misura ogni giorno.

## Cosa consiglio, concretamente

A chi usa servizi online:

- **usate le passkey** dove sono disponibili, e registratene almeno due per gli account importanti, su dispositivi diversi;
- **scegliete un gestore che esporti**, e verificate che lo faccia davvero, invece di fidarvi della promessa;
- **per gli account critici**, posta principale e gestore di password, una chiave fisica più una di riserva resta la scelta più solida;
- **disattivate i metodi deboli** quando non servono più: se accanto alla passkey resta attivo l'accesso con password e SMS, l'attaccante passerà da lì.

A chi progetta servizi:

- **non chiedete l'attestazione agli utenti consumer**: in azienda è uno strumento di controllo legittimo, sul web aperto è esattamente ciò che il post teme;
- **offrite la passkey come opzione privilegiata, non esclusiva**, e progettate il recupero dell'account con la stessa cura: un reset via email debole vanifica tutto il resto;
- **misurate**, invece di fidarvi dei numeri altrui.

## I numeri, con il loro perimetro

Chiudo con i dati, perché il dibattito ne è stato pieno e vanno letti con attenzione: provengono quasi tutti dalla FIDO Alliance o dai fornitori, che hanno interesse a diffonderli.

Il [*Passkey Index 2026*](https://fidoalliance.org/passkey-index-2026/) riporta che il **93%** dei tentativi di accesso con passkey va a buon fine, contro il 78% di password più MFA tradizionale, e che il 36% degli accessi riusciti avviene ormai con passkey. Ma è la media di 15 grandi servizi consumer, non dell'intero web.

[Mercari](https://developers.google.com/identity/passkeys/case-studies/mercari), piattaforma giapponese di compravendita, registra l'82,5% di accessi riusciti con passkey contro il 67,7% con OTP via SMS, in 4,4 secondi invece di 17.

[Okta](https://www.okta.com/newsroom/articles/phishing-is-a-trap-passkeys-arent/), analizzando oltre 6.000 tentativi di ingegneria sociale, stima che le organizzazioni con passkey obbligatorie sia sull'accesso sia sulla gestione dell'account non avrebbero subito alcuna compromissione. È una stima controfattuale di un fornitore, e va presa come tale. Il titolo della loro risposta, però, riassume bene anche la mia: *Phishing is a trap. Passkeys aren't.*

Il post di The Hack ha avuto un merito: ricordare che ogni tecnologia di sicurezza è anche una scelta su chi detiene il controllo. Ma la risposta a quella domanda non è tornare a un metodo che sappiamo vulnerabile. È adottare le passkey e, contemporaneamente, pretendere portabilità, standard aperti e servizi che non chiedano più di quanto serve.

*Per l'analisi dedicata alle aziende, con il confronto fra metodi di autenticazione, gli scenari per dipendenti e clienti e il quadro normativo (NIS2, PSD2, eIDAS 2), rimando al mio articolo su [Passkey in azienda](https://www.fastal.it/it/blog/2026-11-passkey-in-azienda/) sul blog di Fastal.*
