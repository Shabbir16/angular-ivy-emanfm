import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private fb: FormBuilder) {}
  name = 'Angular ' + VERSION.major;
  profileForm: FormGroup;
  userData: any[] = [
    {
      id: 1,
      first_name: 'Jeanette',
      last_name: 'Penddreth',
      email: 'jpenddreth0@census.gov',
      gender: 'Female',
    },
    {
      id: 2,
      first_name: 'Giavani',
      last_name: 'Frediani',
      email: 'gfrediani1@senate.gov',
      gender: 'Male',
    },
    {
      id: 3,
      first_name: 'Noell',
      last_name: 'Bea',
      email: 'nbea2@imageshack.us',
      gender: 'Female',
    },
    {
      id: 4,
      first_name: 'Willard',
      last_name: 'Valek',
      email: 'wvalek3@vk.com',
      gender: 'Male',
    },
  ];
  original: any[] = [];
  searchForm: FormGroup;
  stringLastSearch = '';
  maleTick = false;
  femaleTicl = false;
  ngOnInit() {
    this.original = JSON.parse(JSON.stringify(this.userData));
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
    });

    this.searchForm = this.fb.group({
      gender_male: [''],
      gender_female: [''],
      text: [''],
    });

    this.searchForm
      .get('gender_male')
      .valueChanges.subscribe((selectedValue) => {
        this.maleTick = selectedValue;
        console.log(this.searchForm.get('gender_male').value);
        this.modifyArr(this.stringLastSearch, selectedValue, 'Male');
      });
    this.searchForm
      .get('gender_female')
      .valueChanges.subscribe((selectedValue) => {
        this.femaleTicl = selectedValue;
        console.log(selectedValue);
        this.modifyArr(this.stringLastSearch, selectedValue, 'Female');
      });
    this.searchForm.get('text').valueChanges.subscribe((selectedValue) => {
      this.stringLastSearch = this.searchForm.get('text').value;
      console.log(this.searchForm.get('text').value);
      this.modifyArr(this.searchForm.get('text').value, false, '');
    });
  }
  modifyGender(gender) {
    if (gender) {
      let tempArr = JSON.parse(JSON.stringify(this.userData));
      for (let i = 0; i < tempArr.length; i++) {
        let gen = tempArr[i].gender;
        if (gen == gender) {
        } else {
          tempArr.splice(i, 1);
          i--;
        }
      }
      this.userData = JSON.parse(JSON.stringify(tempArr));
    }
  }
  modifyArr(data, toGen, gen) {
    if (this.femaleTicl && this.maleTick) {
      toGen = false;
    } else if (!this.femaleTicl && !this.maleTick) {
      toGen = false;
    }
    if (data) {
      let tempArr = JSON.parse(JSON.stringify(this.original));
      console.log(tempArr);
      for (let i = 0; i < tempArr.length; i++) {
        data = data.toLowerCase();
        let firstName = tempArr[i].first_name.toLowerCase();
        let lastName = tempArr[i].last_name.toLowerCase();
        let email = tempArr[i].email.toLowerCase();
        if (
          firstName.includes(data) ||
          lastName.includes(data) ||
          email.includes(data)
        ) {
        } else {
          tempArr.splice(i, 1);
          i--;
        }
      }
      this.userData = JSON.parse(JSON.stringify(tempArr));
      if (toGen) {
        if (this.femaleTicl) {
          this.modifyGender('Female');
        } else if (this.maleTick) {
          this.modifyGender('Male');
        }
      }
    } else if (toGen) {
      this.modifyGender(gen);
    } else {
      this.userData = JSON.parse(JSON.stringify(this.original));
      if (this.femaleTicl) {
        this.modifyArr(this.stringLastSearch, true, 'Female');
      } else if (this.maleTick) {
        this.modifyArr(this.stringLastSearch, true, 'Male');
      }
    }
  }

  submit() {
    console.log(this.profileForm.value);

    if (this.profileForm.status == 'INVALID') {
      alert('Please correct form data');
      return;
    }
    let obj = this.profileForm.value;
    this.userData.push({
      id: this.userData.length,
      first_name: obj.firstName,
      last_name: obj.lastName,
      email: obj.email,
      gender: obj.gender,
    });
    this.original.push({
      id: this.userData.length,
      first_name: obj.firstName,
      last_name: obj.lastName,
      email: obj.email,
      gender: obj.gender,
    });
    // console.log(this.profileForm);
  }
}
