import { ref, onMounted } from 'vue';
import PersonService from '@/entities/person/api/person.service';
import type { CastPerson, PersonCastCredit } from '@/shared/api/types';

export function useActorPage(id: string | number) {
  const loading = ref(true);
  const person = ref<CastPerson>({} as CastPerson);
  const castCredits = ref<PersonCastCredit[]>([]);

  onMounted(async () => {
    loading.value = true;
    try {
      const [personData, creditsData] = await Promise.all([
        PersonService.getPerson(id),
        PersonService.getPersonCastCredits(id),
      ]);
      person.value = personData;
      castCredits.value = creditsData.filter(c => c._embedded?.show);
    } finally {
      loading.value = false;
    }
  });

  return { loading, person, castCredits };
}
