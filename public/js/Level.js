import Compositor from './Compositor.js';
import TileCollider from './TileCollider.js';
import EntityCollider from './EntityCollider.js';

export class Level {
    constructor() {
        this.gravity = 1500;
        this.totalTime = 0;

        this.comp = new Compositor()
        this.entities = new Set();

        this.tileCollider = null;
        this.entityCollider = new EntityCollider(this.entities);
    }

    setCollisionGrid(matrix) {
        this.tileCollider = new TileCollider(matrix);
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime, this);

        });

        this.entities.forEach(entity => {
                this.entityCollider.check(entity);
        });

        this.entities.forEach(entity => {
            entity.finalize();
        });
        
        this.totalTime += deltaTime;
    }
}