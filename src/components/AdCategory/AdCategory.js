import React, { useEffect } from 'react';

import CreatableSelect from 'react-select/creatable';
import { getAllTags } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { tagList } from '../../store/slices/ads';

function AdCategory() {
  const tags = useSelector(getAllTags);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tagList([])).catch(error => console.log(error));
  }, [dispatch]);

  return <CreatableSelect isMulti options={tags} />;
}
export default AdCategory;
