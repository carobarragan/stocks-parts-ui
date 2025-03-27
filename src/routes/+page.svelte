<script>
	// import Header from 'lib/components/Header.svelte';
	import Sidebar from '../lib/component/sidebar.svelte';
	import PartsList from '../lib/component/partList.svelte';
	import Footer from '../lib/component/footer.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<div class="flex flex-1 flex-col md:flex-row">
		<Sidebar />
		<div class="flex-1">
			<PartsList />
		</div>
	</div>
	<Footer />
</div>
