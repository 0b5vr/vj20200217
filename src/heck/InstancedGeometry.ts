import { DISPLAY } from './DISPLAY';
import { Geometry } from './Geometry';

export class InstancedGeometry extends Geometry {
  public primcount: number = 0;

  public draw(): void {
    const { gl, glCat } = DISPLAY;
    const ext = glCat.getExtension( 'ANGLE_instanced_arrays', true );

    if ( this.count === 0 ) {
      console.warn( 'You attempt to draw an instanced geometry that count is 0' );
      return;
    }

    if ( this.primcount === 0 ) {
      console.warn( 'You attempt to draw an instanced geometry that primcount is 0' );
      return;
    }

    if ( this.__index ) {
      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.__index.buffer.raw );
      ext.drawElementsInstancedANGLE(
        this.mode,
        this.count,
        this.__index.type,
        this.first * InstancedGeometry.__typeSizeMap[ this.__index.type ],
        this.primcount
      );
      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );
    } else {
      ext.drawArraysInstancedANGLE( this.mode, this.first, this.count, this.primcount );
    }
  }
}
