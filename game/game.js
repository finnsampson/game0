var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gamecontent', {
    preload: preload,
    create: create,
    update: update
});

var gravity = 800;
var playerSpeed = 115;
var playerJump = 250;
var enemySpeed = 250;

var goalX = 825;
var goalY = 225;
var platform;
var platform2;
var platformWidth = 300;
var platformLocationY = 300;
var player;
var cursors;
var playerStartX = 180;
var playerStartY = 260;

class Platform extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'platform');
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.enableBody = true;
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.anchor.setTo(0.5, 0.5);
    game.add.existing(this);
  }
}

class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player');
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.enableBody = true;
    this.anchor.setTo(0.5, 0.5);
    this.checkWorldBounds = true;
    this.events.onOutOfBounds.add(playerOut, this);
    game.add.existing(this);
  }
}

class Enemy extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'enemy');
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.enableBody = true;
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.anchor.setTo(0.5, 0.5);
    game.add.existing(this);
  }
}


class Goal extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'goal');
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.enableBody = true;
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.anchor.setTo(0.5, 0.5);
    game.add.existing(this);
  }
}


function preload() {
  game.load.image('platform', 'sprites/platform.png');
  game.load.image('player', 'sprites/player.png');
  game.load.image('goal', 'sprites/goal.png');
  game.load.image('enemy', 'sprites/enemy.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = gravity;

  game.stage.backgroundColor = "#67BAA6";

  platform = new Platform(game, 300, platformLocationY);
  platform2 = new Platform(game, 700, platformLocationY);

  player = new Player(game, playerStartX, playerStartY);

  enemy = new Enemy(game, 575, 270);
  enemy.body.velocity.x = enemySpeed;

  goal = new Goal(game, goalX, goalY);

  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  var hitPlatform = game.physics.arcade.collide(player, platform);
  var hitPlatform2 = game.physics.arcade.collide(player, platform2);
  var hitPlatform3 = game.physics.arcade.collide(enemy, platform2);
  var lose = game.physics.arcade.collide(player, enemy);
  var win = game.physics.arcade.collide(player, goal);

  if (cursors.left.isDown) {
    player.body.velocity.x = -1 * playerSpeed;
  } else if(cursors.right.isDown) {
    player.body.velocity.x = playerSpeed;
  } else {
    player.body.velocity.x = 0;
  }
  if(enemy.x >= platform2.x + (platformWidth/2) - 25) {
    enemy.body.velocity.x = -1 * enemySpeed;
  } else if(enemy.x <= platform2.x - (platformWidth/2) + 20) {
    enemy.body.velocity.x = enemySpeed;
  };

  if(win) {
    console.log('Winner!');
    playerReset(player);
  } else if(lose) {
    playerOut(player);
  }

  if (cursors.up.isDown && player.body.touching.down && (hitPlatform || hitPlatform2)) {
    player.body.velocity.y = -1 * playerJump;
  }
}

function playerOut(player) {
  console.log('Lose!');
  playerReset(player);
}

function playerReset(player) {
  player.reset(playerStartX, playerStartY);
  player.body.velocity.x = 0;
}
