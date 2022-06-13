const listToTree = list => {
    const map = {};
    const roots = [];
  
    list.forEach((v, i) => {
      map[v.value] = i;
      list[i].children = [];
    });
  
    list.forEach(v => (v.group !== '0' ? list[map[v.group]].children.push(v) : roots.push(v)));
  
    return roots;
  };

export default listToTree;