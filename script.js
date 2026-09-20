const repositoryList = document.querySelector('#repository-list');
const repositoryCount = document.querySelector('#repository-count');

function formatStars(stars) {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(stars);
}

function formatDate(date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(`${date}T00:00:00`));
}

function createRepositoryElement(repository, index) {
  const article = document.createElement('article');
  article.className = 'repository';
  article.style.animationDelay = `${index * 70}ms`;

  const content = document.createElement('div');
  const title = document.createElement('h3');
  const link = document.createElement('a');
  const description = document.createElement('p');
  const metaRow = document.createElement('div');
  const language = document.createElement('span');
  const updated = document.createElement('span');
  const stars = document.createElement('span');

  link.href = repository.url;
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.textContent = repository.name;
  description.textContent = repository.description;
  language.className = 'language';
  language.textContent = repository.language;
  updated.className = 'meta';
  updated.textContent = `更新于 ${formatDate(repository.updatedAt)}`;
  stars.className = 'star-count';
  stars.textContent = `★ ${formatStars(repository.stars)}`;

  title.append(link);
  metaRow.className = 'meta-row';
  metaRow.append(language, updated);
  content.append(title, description, metaRow);
  article.append(content, stars);

  return article;
}

async function loadRepositories() {
  try {
    const response = await fetch('events.json');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);

    const repositories = await response.json();
    repositoryCount.textContent = `${repositories.length} 个仓库`;
    repositoryList.replaceChildren(...repositories.map(createRepositoryElement));
  } catch (error) {
    repositoryCount.textContent = '读取失败';
    repositoryList.innerHTML = '<p class="status-message error-message">暂时无法读取仓库记录，请稍后再试。</p>';
    console.error('Unable to load starred repositories:', error);
  }
}

loadRepositories();
