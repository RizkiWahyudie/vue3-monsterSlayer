Vue.createApp({
    data() {
        return{
            playerHealth: 100,
            monsterHealth: 100,
            jumlahKlik: 0,
            jumlahHeal: 0,
            winner: null,
            logMessage: []
        }
    },
    watch: {
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if(value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if(value <= 0) {
                this.winner = 'player';
            }
        }
    },
    computed: {
        monsterBarStyle() {
            if(this.monsterHealth < 0) {
                return {width: 0 + '%'}; 
            } else {
                return {width: this.monsterHealth + '%'}
            }
        },
        playerBarStyle() {
            if(this.playerHealth < 0) {
                return {width: 0 + '%'}; 
            } else {
                return {width: this.playerHealth + '%'}
            }
        },
        disabledClick() {
            return this.jumlahKlik % 3 !== 0;
        }
    },
    methods: {
        // Menyerang monster
        attackMonster() {
            this.jumlahKlik++;
            // Mengkalikan mtk acak dengan selisih max yaitu 12
            // dan dikurangi min yaitu 5
            // dan kita gunakan math floor agar membulatkan bilangan kebawah
            // dan tambahkan nilai minimum lagi
            // ini adalah cara menghitung nilai acak dengan kapasitas max dan min
            const attackValue = Math.floor(Math.random() * (12 - 5)) + 5;
            // this.monsterHealth = this.monsterHealth - attackValue;
            // ini merupakan notasi perhitungan yang sama seperti diatas
            this.monsterHealth -= attackValue;
            // Memasukkan Log Aktivitas Game
            this.addLogMessage('You', 'Attack', attackValue);
            // Masukkan methods attackPlayer agar ketika dipangggil dihmtl auto menjalankan dua methods
            this.attackPlayer();
        },
        // Monster yang nyerang kita
        attackPlayer() {
            const attackValue = Math.floor(Math.random() * (15 - 8)) + 8;
            this.playerHealth -= attackValue;
            this.addLogMessage('Monster', 'Attack', attackValue);
        },
        // tambahkan special attack untuk penyerangan kita lebih berdamage
        specialMonster() {
            this.jumlahKlik++;
            const attackValue = Math.floor(Math.random() * (25 - 10)) + 10;
            this.monsterHealth -= attackValue;
            this.addLogMessage('You', 'Special Attack', attackValue);
            this.attackPlayer();
        },
        healPlayer() {
            this.jumlahHeal++;
            const healValue = Math.floor(Math.random() * (20 - 8)) + 8;
            if(this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessage('You', 'Heal', healValue);
        },
        startGame() {
            this.playerHealth= 100;
            this.monsterHealth= 100;
            this.jumlahKlik= 0;
            this.jumlahHeal= 0;
            this.winner= null,
            this.logMessage= []
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessage(who, what, value) {
            // membuat data object
            this.logMessage.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
}).mount('#game')