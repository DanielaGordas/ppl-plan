/* you need to make a require context call first and pass it to the function.
the syntax is: 
const context = require.context('../../src/images/infographics-carousel', true, /\.jpg$/);
pass the folder path, and an optional regex (otherwise just pass /./)
*/



const getArrayOfAllFolderChildren = (requireContext) => {
  const context = requireContext;
  const images = context.keys();
  const joinedPaths = [];
  images.forEach(i => {
    joinedPaths.push(context(i));
  });
  return joinedPaths;
}

export default getArrayOfAllFolderChildren;