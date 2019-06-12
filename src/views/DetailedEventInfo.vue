<template>
  <div class="detailed-event-info">
    <DetailedEventCard></DetailedEventCard>
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
  mounted () {
    // console.log(this.$route.params)
  },
  components: {
    DetailedEventCard,
    MoreEventsList
  },
  computed: {
    ...mapState([
        'events',
        'loading'
    ]),
    ...mapGetters([
        'getEventById'
    ]),
  },
}
</script>