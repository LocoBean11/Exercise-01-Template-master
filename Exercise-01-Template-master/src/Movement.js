class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    preload() {
        this.load.spritesheet('character', './assets/spriteSheets/Character_002.png', {
            frameWidth: 48,
            frameHeight: 48
        });
    }

    create() {
        this.cameras.main.setBackgroundColor(0xdddddd)
        
        this.player = this.physics.add.sprite(width / 2, height / 2, 'character', 1).setScale(2)
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setSize(32, 32).setOffset(8, 16)

        this.PLAYER_VELOCITY = 350

       

        cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'idle-down',
            frameRate: 0, 
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('character', {
                start: 1,
                end: 1
            })
        })

    this.anims.create({
        key: 'walk-down',
        frameRate: 0, 
        repeat: -1, 
        frames: this.anims.generateFrameNumbers('character', {
            start: 0,
            end: 2
        })
    })

    this.anims.create({
        key: 'idle-up',
        frameRate: 0, 
        repeat: -1, 
        frames: this.anims.generateFrameNumbers('character', {
            start: 1,
            end: 1
        })
    });

    this.anims.create({
        key: 'walk-up',
        frameRate: 0, 
        repeat: -1, 
        frames: this.anims.generateFrameNumbers('character', {
            start: 9,
            end: 11
        })
    })
    
}

    update() {
        let playerDirection = 'down';
        let playerVector = new Phaser.Math.Vector2(0, 0);

        if(cursors.left.isDown) {
            playerVector.x = -1;
            let playerDirection = 'left';

        } else if (cursors.right.isDown) {
            let playerDirection = 'right';
            playerVector.x = 1;
        }

        if(cursors.up.isDown) {
            let playerDirection = 'up';
            playerVector.y = -1;

        } else if (cursors.down.isDown) {
            let playerDirection = 'down';
            playerVector.y = 1;
        }
    
        playerVector.normalize();
    
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)
    
        let playerMovement = playerVector.length() ? 'walk' : 'idle';
        this.player.play(playerMovement + '-' + playerDirection, true);
            }
        }
        
