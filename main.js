class Hero {
    constructor(name, hp) {
      this.name = name;
      this.hp = hp; // healthy points
      this.canFly = false;
      this.shield = false;
    }
    attacked(damage) { // metoda attacked este apelata de fiecare data cand un erou ataca un alt erou (eroul atacat apeleaza aceasta metoda pentru a-si calcula damage-ul primit)
      if (this.canFly) { // se verifica daca eroul poate zbura
        let chance = Math.random(); //aici variabila chance va primi valoarea doar in intervalul 0 - 1
        //console.log(chance);
        if (chance > 0.5) { //daca valoarea variabilei chance > 0.5 atunci eroul zboara si evita damage-ul (damage = 0)
          console.log(this.name + "flew away.");
          damage = 0;
        }
      }
      if (this.shield) { // se verifica daca eroul are scut
        damage *= 0.8; //damage scade cu 0.2
        console.log(this.name + "defends with a shield");
      }
      this.hp -= damage; // se actualizeaza hp
      console.log(
        this.name +
          "has been attacked. HP reduce by " +
          damage +
          ".HP remaining: " +
          this.hp +
          "."
      );
    }
  }
  //mai jos declaram clasele copii Dwarf, Sprite si Dragon care extind clasa parinte Hero
  class Dwarf extends Hero {
    constructor(name, hp) {
      super(name, hp);
      this.shield = true; //setam valoarea proprietatii shield = true
    }
    attack(otherHero) {
      let damage = 10;
      console.log(this.name + "attacked with damage: " + damage + ".");
      otherHero.attacked(damage); //un erou ataca prin metoda attack() si celalaalt erou isi calculeaza HP ramas scazand damage-ul primit(calculul se face prin metoda attaked(damage))
    }
  }
  class Sprite extends Hero {
    constructor(name, hp) {
      super(name, hp);
      this.canFly = true; //poate sa zboare
    }
    attack(otherHero) {
      let damage = 15;
      console.log(this.name + "attaked with damage: " + damage + ".");
      otherHero.attacked(damage);
    }
  }
  class Dragon extends Hero {
    constructor(name, hp) {
      super(name, hp);
      this.canFly = true;
      this.shield = true;
    }
    attack(otherHero) {
      let damage = 5;
      console.log(this.name + "attacked with damage: " + damage + ".");
      otherHero.attacked(damage);
    }
  }
  class Fight {
    constructor(hero1, hero2) { //clasa Fight primeste ca si proprietati doua obiecte: hero1, hero2 (cand instantiem clasa si cream obiectul epicFight, fiecarei proprietati i se va atribui unul dintre cele trei obiecte create din clasele Dwarf, Sprite si Dragon)
      this.hero1 = hero1;
      this.hero2 = hero2;
      this.turn = 0;
    }
    performAttack() { // metoda ce executa atacul (un singur atac o data: daca tura === 0, ataca primul erou, daca tura === 1 ataca al doilea erou). Metoda se apeleaza in go(), atata timp cat ambii eroi sunt in viata
      if (this.turn === 0) {
        this.hero1.attack(this.hero2);
      } else {
        this.hero2.attack(this.hero1);
      }
    }
    changeTurn() {
      this.turn = 1 - this.turn; // schimba tura; aceasta poate fi doar 0 sau 1
    }
    findWinner() { // metoda ce logheaza in consola castigatorul; metoda este apelata in go();
      let winner = '';
      if (this.hero1.hp > 0) {
        winner = this.hero1.name + " won with " + this.hero1.hp + " HP left."; 
        console.log(winner);
        return winner;
      } else if (this.hero2 > 0) {
        winner = this.hero2.name + " won with " + this.hero2.hp + " HP left.";
        console.log(winner);
        return winner;
      } else {
        winner = "No heroes left alive.";
        console.log(winner);
        return winner;
      }
    }
    go() { // executa permormAttack si schimbarea turei atata timp cat ambii eroi sunt in viata: this.hero1.hp > 0 && this.hero2.hp > 0
      do { // do {} while() este un statement ce se executa atata timp cat conditia din while() este true.
        this.performAttack();
        this.changeTurn();
      } while (this.hero1.hp > 0 && this.hero2.hp > 0);
      this.findWinner();
    }
  }
  let dwarf = new Dwarf("Khurbada Oakenguard Dwarf", 50);
  let sprite = new Sprite("Prinna Bumblelace Sprite", 40);
  let dragon = new Dragon("Aphat, The Pun Dragon", 60);
  let epicFight = new Fight(dwarf, dragon);
  epicFight.go(); //pornim lupta