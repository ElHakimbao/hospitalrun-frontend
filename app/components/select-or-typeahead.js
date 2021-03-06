import { isEmpty } from '@ember/utils';
import Component from '@ember/component';
import { computed } from '@ember/object';
import SelectValues from 'hospitalrun/utils/select-values';

export default Component.extend({
  name: 'select-or-typeahead',
  className: null,
  hint: true,
  label: null,
  list: null,
  optionLabelPath: 'value',
  optionValuePath: 'id',
  property: null,
  prompt: ' ',
  selection: null,
  setOnBlur: true,
  typeAheadType: null,

  content: computed('list.value.[]', function() {
    let list = this.get('list');
    let optionLabelPath = this.get('optionLabelPath');
    let optionValuePath = this.get('optionValuePath');
    let userCanAdd = this.get('userCanAdd');

    if (!isEmpty(list) && list.get) {
      let contentList = list.get('value');
      if (isEmpty(contentList)) {
        return [];
      }

      if (!userCanAdd && optionLabelPath === 'value' && optionValuePath === 'id') {
        return contentList.map(SelectValues.selectValuesMap);
      } else {
        return contentList;
      }
    }
  }),

  usePricingTypeAhead: computed('typeAheadType', function() {
    return (this.get('typeAheadType') === 'pricing');
  }),

  userCanAdd: computed('list.userCanAdd', function() {
    let list = this.get('list');
    if (!isEmpty(list) && list.get) {
      return list.get('userCanAdd');
    } else {
      return true;
    }
  })
});
