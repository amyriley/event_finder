<template>
  <div class="detailed-event-info">
    <DetailedEventCard></DetailedEventCard>
    <MoreEventsList></MoreEventsList>
    <NavigationBottom></NavigationBottom>
  </div>
</template>

<script>
import NavigationBottom from '@/components/NavigationBottom'
import DetailedEventCard from '@/components/DetailedEventCard'
import MoreEventsList from '@/components/MoreEventsList'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'detailed-event-info',
  components: {
    DetailedEventCard,
    MoreEventsList,
    NavigationBottom
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