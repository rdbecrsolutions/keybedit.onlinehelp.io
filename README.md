# Guida Keyb(ED)It!

Guida HTML per l'esercente, con immagini e brevi filmati delle operazioni
eseguite da Keyb(ED)It! su un registratore SMARTY EVO.

## Pubblicazione

Il sito viene pubblicato con GitHub Pages dal ramo `main`, cartella radice:

https://rdbecrsolutions.github.io/keybedit.onlinehelp.io/

Il pulsante Help dell'app usa attualmente l'indirizzo GitHub Pages sopra.
Il dominio personalizzato previsto e' `https://keybedit.onlinehelp.io/`.
Per attivarlo, configurare un record DNS CNAME `keybedit` verso
`rdbecrsolutions.github.io`, quindi impostare il dominio personalizzato nelle
impostazioni Pages del repository e abilitare HTTPS quando il certificato
e' disponibile. Non impostare il dominio in Pages prima che il DNS sia pronto:
il sito provvisorio deve restare raggiungibile.

Non sono necessari compilazione o servizi esterni. Per controllare localmente
anche le didascalie dei video, avviare un server HTTP nella cartella del sito:

```powershell
python -m http.server 8768 --bind 127.0.0.1
```

Aprire `http://127.0.0.1:8768/` e terminare il server dopo la verifica.

## Aggiornamenti

- Conservare solo i contenuti multimediali richiamati dalla guida.
- Oscurare gli identificativi e non pubblicare dati dei clienti o riprese di
  persone.
- Mantenere i passaggi testuali e le didascalie insieme ai video.
- Distinguere le dimostrazioni interrotte prima dell'incasso dai pagamenti
  effettivamente completati.
- Verificare ricerca, collegamenti, immagini, filmati, telefono e stampa.
