<template>
  <div class="detailed-event-info">
    <DetailedEventCard></DetailedEventCard>
    <v-spacer></v-spacer>
    <MoreEventsList></MoreEventsList>
  </div>
</template>

<script>
import DetailedEventCard from '@/components/DetailedEventCard'
import MoreEventsList from '@/components/MoreEventsList'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'detailed-event-info',
  components: {
    DetailedEventCard,
    MoreEventsList
  },
  computed: {
    ...mapState([
        'events',
        'loading',
        'searchInput'
    ]),
    ...mapGetters([
        'getEventById'
    ]),
  },
}
</script>