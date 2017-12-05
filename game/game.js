var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gamecontent', {
    preload: preload,
    create: create,
    update: update
});

var rect;


function preload() {
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.stage.backgroundColor = "#67BAA6";
  rect = game.add.sprite(0, 0, 'sprites/platform.png');
  game.physics.enable(rect, Phaser.Physics.ARCADE);
  // rect.tint = 0x4E004E;
  rect.body.setSize(50, 200, 300, 30);

  // var graphics = game.add.graphics(100, 100);
  // graphics.beginFill(0x4E004E, 1);
  // graphics.drawRect(50, 200, 300, 30);
  // graphics.drawRect(450, 200, 300, 30);
  // window.graphics = graphics;
}

function update() {
}
// game.physics.arcade.overlap(rect, sprite, function(r, s) {
//   // overlap code here, with r and s corresponding to
//   // the rect and sprite objects that have overlapped
// });
