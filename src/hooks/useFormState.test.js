import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFormState } from './useFormState';

describe('useFormState hook', () => {
  const testKey = 'test-form-state';

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with initial state when localStorage is empty', () => {
    const initialState = { name: '', email: '' };
    const { result } = renderHook(() => useFormState(testKey, initialState));
    const [state] = result.current;

    expect(state).toEqual(initialState);
  });

  it('should restore state from localStorage if available', () => {
    const savedState = { name: 'John', email: 'john@example.com' };
    localStorage.setItem(testKey, JSON.stringify(savedState));

    const { result } = renderHook(() => useFormState(testKey, { name: '', email: '' }));
    const [state] = result.current;

    expect(state).toEqual(savedState);
  });

  it('should update state and persist to localStorage', () => {
    const initialState = { name: '', email: '' };
    const { result } = renderHook(() => useFormState(testKey, initialState));
    const [, updateState] = result.current;

    act(() => {
      updateState({ name: 'Jane' });
    });

    const [newState] = result.current;
    expect(newState.name).toBe('Jane');
    expect(JSON.parse(localStorage.getItem(testKey))).toEqual({
      name: 'Jane',
      email: '',
    });
  });

  it('should support function-based updates', () => {
    const initialState = { count: 0 };
    const { result } = renderHook(() => useFormState(testKey, initialState));
    const [, updateState] = result.current;

    act(() => {
      updateState((prev) => ({ count: prev.count + 1 }));
    });

    const [newState] = result.current;
    expect(newState.count).toBe(1);
  });

  it('should clear state and localStorage', () => {
    const initialState = { name: '', email: '' };
    localStorage.setItem(testKey, JSON.stringify({ name: 'Test', email: 'test@example.com' }));

    const { result } = renderHook(() => useFormState(testKey, initialState));
    const [, , clearState] = result.current;

    act(() => {
      clearState();
    });

    const [newState] = result.current;
    expect(newState).toEqual(initialState);
    expect(localStorage.getItem(testKey)).toBeNull();
  });
});
