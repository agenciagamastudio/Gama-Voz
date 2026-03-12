import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAchievements } from '../../hooks/useAchievements';
import { useAuth } from '../../context/AuthContext';
import { usePoints } from '../../context/PointsContext';
import { useToast } from '../../context/ToastContext';
import { supabase } from '../../utils/supabase';

// Mock dependencies
vi.mock('../../context/AuthContext');
vi.mock('../../context/PointsContext');
vi.mock('../../context/ToastContext');
vi.mock('../../utils/supabase');

describe('useAchievements Hook', () => {
  const mockUser = { id: 'test-user-123' };

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mocks
    vi.mocked(useAuth).mockReturnValue({
      currentUser: mockUser,
      profile: { full_name: 'Test User' },
      profileLoading: false,
      updateUserProfile: vi.fn()
    });

    vi.mocked(usePoints).mockReturnValue({
      balance: 20,
      spendPoints: vi.fn(),
      addBonusPoints: vi.fn(),
      redeemCode: vi.fn(),
      promoCodes: {},
      addPromoCode: vi.fn(),
      removePromoCode: vi.fn()
    });

    vi.mocked(useToast).mockReturnValue({
      addToast: vi.fn()
    });

    // Mock Supabase response: no achievements yet
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: [],
          error: null
        })
      }),
      insert: vi.fn().mockResolvedValue({
        data: null,
        error: null
      })
    });
  });

  it('should initialize with empty achievements', async () => {
    const { result } = renderHook(() => useAchievements());

    await waitFor(() => {
      expect(result.current.initialized).toBe(true);
    });

    expect(result.current.completedActions.size).toBe(0);
  });

  it('should load user achievements from Supabase', async () => {
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: [
            { action_type: 'complete_profile' },
            { action_type: 'first_diagnostic' }
          ],
          error: null
        })
      }),
      insert: vi.fn().mockResolvedValue({ data: null, error: null })
    });

    const { result } = renderHook(() => useAchievements());

    await waitFor(() => {
      expect(result.current.initialized).toBe(true);
    });

    expect(result.current.completedActions.size).toBe(2);
    expect(
      result.current.checkAchievementStatus('complete_profile')
    ).toBe(true);
  });

  it('should complete achievement and grant points', async () => {
    const mockAddBonusPoints = vi.fn();
    vi.mocked(usePoints).mockReturnValue({
      balance: 20,
      spendPoints: vi.fn(),
      addBonusPoints: mockAddBonusPoints,
      redeemCode: vi.fn(),
      promoCodes: {},
      addPromoCode: vi.fn(),
      removePromoCode: vi.fn()
    });

    const { result } = renderHook(() => useAchievements());

    let success;
    await act(async () => {
      success = await result.current.completeAchievement('complete_profile');
    });

    expect(success).toBe(true);
    expect(mockAddBonusPoints).toHaveBeenCalledWith(
      5,
      'Completar Perfil'
    );
    expect(result.current.completedActions.has('complete_profile')).toBe(
      true
    );
  });

  it('should prevent duplicate achievement completion', async () => {
    const mockAddBonusPoints = vi.fn();
    vi.mocked(usePoints).mockReturnValue({
      balance: 20,
      spendPoints: vi.fn(),
      addBonusPoints: mockAddBonusPoints,
      redeemCode: vi.fn(),
      promoCodes: {},
      addPromoCode: vi.fn(),
      removePromoCode: vi.fn()
    });

    const { result } = renderHook(() => useAchievements());

    // First completion
    await act(async () => {
      await result.current.completeAchievement('complete_profile');
    });

    // Try to complete again
    let secondSuccess;
    await act(async () => {
      secondSuccess = await result.current.completeAchievement(
        'complete_profile'
      );
    });

    expect(secondSuccess).toBe(false);
    expect(mockAddBonusPoints).toHaveBeenCalledTimes(1);
  });

  it('should calculate total earned points correctly', async () => {
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: [
            { action_type: 'complete_profile', points_earned: 5 },
            { action_type: 'first_diagnostic', points_earned: 5 },
            { action_type: 'share_proposal', points_earned: 3 }
          ],
          error: null
        })
      }),
      insert: vi.fn().mockResolvedValue({ data: null, error: null })
    });

    const { result } = renderHook(() => useAchievements());

    await waitFor(() => {
      expect(result.current.initialized).toBe(true);
    });

    expect(result.current.getTotalEarnedPoints()).toBe(13);
  });

  it('should return achievements list with completion status', async () => {
    const { result } = renderHook(() => useAchievements());

    await waitFor(() => {
      expect(result.current.initialized).toBe(true);
    });

    const list = result.current.getAchievementsList();

    expect(list.length).toBeGreaterThanOrEqual(6);
    expect(list[0]).toHaveProperty('id');
    expect(list[0]).toHaveProperty('name');
    expect(list[0]).toHaveProperty('points');
    expect(list[0]).toHaveProperty('completed');
  });

  it('should require login to complete achievement', async () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null,
      profile: null,
      profileLoading: false,
      updateUserProfile: vi.fn()
    });

    const mockAddToast = vi.fn();
    vi.mocked(useToast).mockReturnValue({
      addToast: mockAddToast
    });

    const { result } = renderHook(() => useAchievements());

    let success;
    await act(async () => {
      success = await result.current.completeAchievement('complete_profile');
    });

    expect(success).toBe(false);
    expect(mockAddToast).toHaveBeenCalledWith(
      'Faça login para ganhar pontos.',
      'error'
    );
  });

  it('should handle Supabase errors gracefully', async () => {
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: null,
          error: new Error('Supabase error')
        })
      }),
      insert: vi.fn().mockRejectedValue(new Error('Insert failed'))
    });

    const mockAddToast = vi.fn();
    vi.mocked(useToast).mockReturnValue({
      addToast: mockAddToast
    });

    const { result } = renderHook(() => useAchievements());

    let success;
    await act(async () => {
      success = await result.current.completeAchievement('complete_profile');
    });

    expect(success).toBe(false);
    expect(mockAddToast).toHaveBeenCalledWith(
      'Erro ao registrar ação. Tente novamente.',
      'error'
    );
  });
});
