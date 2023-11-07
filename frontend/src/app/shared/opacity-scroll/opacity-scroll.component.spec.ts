import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { OpacityScrollComponent } from './opacity-scroll.component';

describe('OpacityScrollComponent', () => {
  let component: OpacityScrollComponent;
  let fixture: ComponentFixture<OpacityScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpacityScrollComponent],
      imports: [MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OpacityScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get Scroll Indicator Style', () => {
    component.scrollIndicatorVisibility = 'visibility';
    expect(component.getScrollIndicatorStyle()).toEqual({
      visibility: component.scrollIndicatorVisibility,
    });
  });

  it('should scroll scroll indicator hidden', () => {
    const child1 = { offsetTop: 5, setAttribute: () => {} };
    const child2 = { offsetTop: 15, setAttribute: () => {} };
    const event = { target: { scrollTop: 30, children: [{ children: [child1, child2] }] } };
    jest.spyOn(child1, 'setAttribute').mockReturnValue(undefined);
    jest.spyOn(child2, 'setAttribute').mockReturnValue(undefined);

    component.scroll(event);

    expect(child1.setAttribute).toHaveBeenCalledWith('style', 'opacity: 0.84375');
    expect(child2.setAttribute).toHaveBeenCalledWith('style', 'opacity: 0.9392499999999999');
    expect(component.scrollIndicatorVisibility).toBe('hidden');
  });

  it('should scroll scroll indicator visible', () => {
    const child1 = { offsetTop: -10, setAttribute: () => {} };
    const child2 = { offsetTop: -9, setAttribute: () => {} };
    const event = { target: { scrollTop: 90, children: [{ children: [child1, child2] }] } };
    jest.spyOn(child1, 'setAttribute').mockReturnValue(undefined);
    jest.spyOn(child2, 'setAttribute').mockReturnValue(undefined);

    component.scroll(event);

    expect(child1.setAttribute).toHaveBeenCalledWith('style', 'opacity: 0');
    expect(child2.setAttribute).toHaveBeenCalledWith('style', 'opacity: 0.00029800000000000003');
    expect(component.scrollIndicatorVisibility).toBe('visible');
  });

  it('should scroll width threshold opacity', () => {
    const child1 = { offsetTop: -80, clientHeight: 80, setAttribute: () => {} };
    const child2 = {
      offsetTop: -159,
      clientHeight: 80,
      setAttribute: () => {},
    };
    const child3 = {
      offsetTop: -160,
      clientHeight: 80,
      setAttribute: () => {},
    };
    const child4 = {
      offsetTop: -161,
      clientHeight: 80,
      setAttribute: () => {},
    };
    const event = {
      target: { scrollTop: 80, children: [{ children: [child1, child2, child3, child4] }] },
    };
    jest.spyOn(child1, 'setAttribute').mockReturnValue(undefined);
    jest.spyOn(child2, 'setAttribute').mockReturnValue(undefined);
    jest.spyOn(child3, 'setAttribute').mockReturnValue(undefined);
    jest.spyOn(child4, 'setAttribute').mockReturnValue(undefined);

    component.scroll(event);

    expect(child1.setAttribute).toHaveBeenCalledWith('style', 'opacity: 0.3');
    expect(child2.setAttribute).toHaveBeenCalledWith('style', 'opacity: 0.3');
    expect(child3.setAttribute).toHaveBeenCalledWith('style', 'visibility: hidden');
    expect(child4.setAttribute).toHaveBeenCalledWith('style', 'visibility: hidden');
  });
});
