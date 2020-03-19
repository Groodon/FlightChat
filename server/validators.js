// Check for:
// - Duplicates
// - Empty tags
// - Tags with spaces at end or beginning
function validTags(tags) {
  const tagSet = new Set(tags);
  const duplicateExists = tagSet.size !== tags.length;
  const invalidTagExists = tags.some((tag) => {
    const sideSpaceExists = tag.trim() !== tag;
    const isEmptyTag = tag === '';
    return sideSpaceExists || isEmptyTag;
  });

  // To be valid, none of the variables can be true
  return !(duplicateExists && invalidTagExists)
}

function validComment(comment) {
  return validTags(comment.tags);
}

module.exports = {
  validComment: validComment
};


