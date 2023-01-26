<script>
	// import pageAnimation from './components/page-animation'
	export default {
		// mixins: [pageAnimation],
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	// @import "uview-ui/index.scss";
	@import "static/styles/frame.css";
	// @import "static/styles/ficon.css";
	@import "static/styles/public.css";
</style>
