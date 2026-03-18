import { apiClient } from '@/shared/api/client';
import type { CastPerson, PersonCastCredit } from '@/shared/api/types';

export default {
  async getPerson(id: string | number): Promise<CastPerson> {
    const { data } = await apiClient.get<CastPerson>(`/people/${id}`);
    return data;
  },
  async getPersonCastCredits(id: string | number): Promise<PersonCastCredit[]> {
    const { data } = await apiClient.get<PersonCastCredit[]>(
      `/people/${id}/castcredits?embed=show`
    );
    return data;
  },
};
