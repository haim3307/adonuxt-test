<script>
export default {
  fanctional: true,
  render(h) {
    return [
      <network network="facebook" class="socialItem">
        <i class="fa fa-facebook" />
      </network>,
      <network network="whatsapp" class="socialItem">
        <i class="fa fa-whatsapp" />
      </network>,
      <network network="googleplus" class="socialItem">
        <i class="fa fa-google-plus" />
      </network>
    ];
  }
};
</script>
