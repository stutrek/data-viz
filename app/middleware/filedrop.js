import * as dataActions from '../components/Data/actions'
import fs from 'fs';

export default function httpErrorMiddleware() {
    var dispatch = null;
    console.log('HERE")')
    document.addEventListener('dragover', function (event) {
      event.preventDefault();
      return false;
    }, false);

    document.addEventListener('drop', function (event) {
      event.preventDefault();
      console.log(event);

      var path = event.dataTransfer.files[0].path

      fs.readFile(event.dataTransfer.files[0].path, (err, data) => {
        if (err) throw err;
        var action =  dataActions.addCsv(data.toString(), path)
        dispatch(action)
      });

      return false;
    }, false);
    return store => {
        dispatch = store.dispatch;
        return next => action => next(action);
    };
}

console.log('ads')