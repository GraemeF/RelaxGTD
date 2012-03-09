guard 'shell' do
  watch(/(.*\.js)/) { `node_modules/mocha/bin/mocha --report landing test/server/*.js test/endtoend/*.js` }
end

guard 'livereload', :apply_js_live => false do
  watch(/test\/browser\/.*/)
  watch(/ui\/.*/)
end
